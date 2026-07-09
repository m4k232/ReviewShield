import json
import os
import csv
import urllib.request
import urllib.parse
import html
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler

# Lazy-loaded Firestore Client
_db_client = None

def get_firestore_client():
    global _db_client
    if _db_client is not None:
        return _db_client
        
    import firebase_admin
    from firebase_admin import credentials, firestore
    
    if not firebase_admin._apps:
        creds_json = os.environ.get("GOOGLE_SHEETS_CREDENTIALS")
        if not creds_json:
            raise RuntimeError("GOOGLE_SHEETS_CREDENTIALS environment variable is missing")
        creds_data = json.loads(creds_json)
        cred = credentials.Certificate(creds_data)
        firebase_admin.initialize_app(cred)
        
    _db_client = firestore.client()
    return _db_client

# Local fallback config helper
def get_client_from_json(cid):
    candidates = [
        os.path.join(os.getcwd(), 'public', 'clients.json'),
        os.path.join(os.path.dirname(__file__), '..', 'public', 'clients.json'),
        'public/clients.json'
    ]
    for p in candidates:
        if os.path.exists(p) and os.path.isfile(p):
            try:
                with open(p, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                return data.get(cid)
            except Exception:
                pass
    return None

def get_client_config(cid):
    # Try Firestore
    try:
        db = get_firestore_client()
        doc = db.collection('clients').document(cid).get()
        if doc.exists:
            return doc.to_dict()
    except Exception as e:
        print(f"[WARNING] Could not fetch config from Firestore for {cid}: {e}")
        
    # Fallback to Local JSON
    return get_client_from_json(cid)

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_url = urllib.parse.urlparse(self.path)
        path = parsed_url.path
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        if path == "/api/client":
            client_id = query_params.get('id', [None])[0]
            if not client_id:
                self._send_json(400, {
                    "status": "error",
                    "message": "Missing required parameter: id"
                })
                return
                
            client_data = get_client_config(client_id)
            if not client_data:
                self._send_json(404, {
                    "status": "error",
                    "message": f"Client '{client_id}' not found"
                })
                return
                
            self._send_json(200, {
                "status": "success",
                "data": {
                    "name": client_data.get("name"),
                    "logo": client_data.get("logo"),
                    "googleMapsUrl": client_data.get("googleMapsUrl")
                }
            })
            return
            
        if path == "/" or path == "" or path == "/index.html":
            candidates = [
                os.path.join(os.getcwd(), 'public', 'index.html'),
                os.path.join(os.path.dirname(__file__), '..', 'public', 'index.html'),
                'public/index.html'
            ]
            
            content = None
            for p in candidates:
                if os.path.exists(p) and os.path.isfile(p):
                    try:
                        with open(p, 'r', encoding='utf-8') as f:
                            content = f.read()
                        break
                    except Exception:
                        pass
                        
            if content is not None:
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.end_headers()
                self.wfile.write(content.encode('utf-8'))
                return
            else:
                self.send_response(404)
                self.send_header('Content-Type', 'text/plain; charset=utf-8')
                self.end_headers()
                self.wfile.write(b"index.html not found on server")
                return
                
        self.send_response(404)
        self.end_headers()
        self.wfile.write(b"404 Not Found")

    def do_POST(self):
        # 1. Parse content type
        content_type = self.headers.get('Content-Type', '')
        if 'application/json' not in content_type:
            self._send_json(400, {
                "status": "error",
                "message": "Content-Type must be application/json"
            })
            return
            
        content_length = int(self.headers.get('Content-Length', 0))
        if content_length == 0:
            self._send_json(400, {
                "status": "error",
                "message": "Empty request body"
            })
            return
            
        # 2. Read request body
        try:
            body_data = self.rfile.read(content_length)
            data = json.loads(body_data.decode('utf-8'))
        except Exception as e:
            self._send_json(400, {
                "status": "error",
                "message": f"Invalid JSON payload: {str(e)}"
            })
            return
            
        # 3. Extract and validate parameters
        client_id = data.get('client_id')
        rating = data.get('rating')
        message = data.get('message')
        phone = data.get('phone', '')
        recaptcha_token = data.get('recaptcha_token', '')
        
        if not client_id or rating is None or not message:
            self._send_json(400, {
                "status": "error",
                "message": "Missing required fields: client_id, rating, message"
            })
            return

        # Verify reCAPTCHA
        recaptcha_secret = os.environ.get("RECAPTCHA_SECRET")
        if recaptcha_secret:
            if not recaptcha_token:
                self._send_json(403, {
                    "status": "error",
                    "message": "Missing reCAPTCHA token"
                })
                return
            
            verify_url = "https://www.google.com/recaptcha/api/siteverify"
            payload = urllib.parse.urlencode({
                "secret": recaptcha_secret,
                "response": recaptcha_token
            }).encode('utf-8')
            
            try:
                req = urllib.request.Request(verify_url, data=payload, method="POST")
                with urllib.request.urlopen(req, timeout=5) as response:
                    res_body = response.read().decode("utf-8")
                    verify_result = json.loads(res_body)
                    if not verify_result.get("success") or verify_result.get("score", 1.0) < 0.5:
                        self._send_json(403, {
                            "status": "error",
                            "message": "Bot verification failed (low score or invalid token)"
                        })
                        return
            except Exception as e:
                print(f"[WARNING] reCAPTCHA verification failed network call: {e}")
            
        try:
            rating_val = int(rating)
            if rating_val < 1 or rating_val > 5:
                raise ValueError("Rating must be between 1 and 5")
        except ValueError as e:
            self._send_json(400, {
                "status": "error",
                "message": str(e)
            })
            return
            
        # 4. Generate current timestamp in UTC
        timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
        
        # 5. Save feedback data
        try:
            save_method = self._save_feedback(timestamp, client_id, rating_val, message, phone)
            
            # Send Telegram notification for landing page leads
            if client_id == 'LANDING_PAGE_LEAD':
                email = message
                if "od: " in message:
                    email = message.split("od: ")[-1]
                elif "от: " in message:
                    email = message.split("от: ")[-1]
                
                # Telegram alert
                tg_message = (
                    "<b>🚀 Новая заявка на тест 14 дней!</b>\n\n"
                    f"📧 <b>Email:</b> <code>{html.escape(email)}</code>\n"
                    f"⏰ <b>Время:</b> {timestamp}"
                )
                self._send_telegram_notification(tg_message)

                # Email alert
                email_subject = "🚀 Nowe zgłoszenie: Darmowy test 14 dni"
                email_body = f"""
                <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
                  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee;">
                    <h2 style="color: #007aff; margin-top: 0;">🚀 Nowe zgłoszenie: Darmowy test 14 dni</h2>
                    <p>Otrzymano nowe zapytanie o 14-dniowy darmowy test systemu ReviewShield.</p>
                    <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
                      <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Adres e-mail:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #007aff; font-weight: bold;">{email}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Czas zapisu:</td>
                        <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">{timestamp}</td>
                      </tr>
                    </table>
                    <div style="margin-top: 24px; font-size: 0.85rem; color: #999; text-align: center;">
                      Powered by ReviewShield 🛡️
                    </div>
                  </div>
                </body>
                </html>
                """
                self._send_email_notification(email_subject, email_body)
            else:
                # Send email alert for negative feedback (1, 2 or 3 stars)
                if rating_val <= 3:
                    recipient_email = None
                    client_config = get_client_config(client_id)
                    if client_config:
                        recipient_email = client_config.get("adminEmail")
                        
                    email_subject = f"⚠️ [ReviewShield] Nowa negatywna opinia ({rating_val}★) - {client_id}"
                    email_body = f"""
                    <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px;">
                      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border: 1px solid #eee;">
                        <h2 style="color: #ff453a; margin-top: 0;">⚠️ Nowa negatywna opinia ({rating_val} gwiazdki)</h2>
                        <p>Klient zostawił negatywną opinię w systemie ReviewShield.</p>
                        <table style="border-collapse: collapse; width: 100%; margin-top: 16px;">
                          <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px;">Klient ID:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">{client_id}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Ocena:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #ff453a; font-weight: bold;">{rating_val}★</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Treść opinii:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #222; font-style: italic;">"{message}"</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Numer telefonu:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #222;">{phone or 'Nie podano'}</td>
                          </tr>
                          <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Czas zapisu:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">{timestamp}</td>
                          </tr>
                        </table>
                        <div style="margin-top: 24px; padding: 12px; background-color: #ffeef0; border-left: 4px solid #ff453a; border-radius: 4px; font-size: 0.9rem; color: #940000; font-weight: bold;">
                          Reaguj natychmiast, aby rozwiązać problem zanim klient opuści Twój lokal!
                        </div>
                        <div style="margin-top: 24px; font-size: 0.85rem; color: #999; text-align: center;">
                          Powered by ReviewShield 🛡️
                        </div>
                      </div>
                    </body>
                    </html>
                    """
                    self._send_email_notification(email_subject, email_body, recipient_email)
                
                # Send Telegram client alert if telegramChatId is configured
                if client_config and client_config.get("telegramChatId"):
                    client_name = client_config.get("name", client_id)
                    safe_message = html.escape(message)
                    safe_name = html.escape(client_name)
                    safe_phone = html.escape(phone) if phone else 'Nie podano'
                    
                    tg_alert_message = (
                        f"⚠️ <b>[ReviewShield] Nowa negatywna opinia</b>\n\n"
                        f"📍 <b>Lokal:</b> {safe_name}\n"
                        f"⭐ <b>Ocena:</b> {rating_val}★\n"
                        f"💬 <b>Treść:</b> \"{safe_message}\"\n"
                        f"📞 <b>Telefon:</b> {safe_phone}\n"
                        f"🕒 <b>Czas:</b> {timestamp}\n\n"
                        f"👉 <i>Zareaguj natychmiast, aby rozwiązać problem zanim gość opuści lokal!</i>"
                    )
                    self._send_telegram_review_alert(client_config.get("telegramChatId"), tg_alert_message)

            self._send_json(200, {
                "status": "success",
                "message": "Feedback submitted successfully",
                "save_method": save_method
            })
        except Exception as e:
            self._send_json(500, {
                "status": "error",
                "message": f"Failed to save feedback: {str(e)}"
            })

    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json')
        # Setup CORS headers for development/cross-origin needs
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        # Support CORS preflight requests
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def _send_telegram_notification(self, message_text):
        bot_token = os.environ.get("TELEGRAM_BOT_TOKEN")
        chat_id = os.environ.get("TELEGRAM_ADMIN_CHAT_ID")
        if not bot_token or not chat_id:
            print("[WARNING] Telegram credentials missing, skipping notification.")
            return False
            
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": message_text,
            "parse_mode": "HTML"
        }
        
        try:
            data = urllib.parse.urlencode(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, method="POST")
            with urllib.request.urlopen(req, timeout=5) as response:
                res_body = response.read().decode("utf-8")
                print(f"[INFO] Telegram notification sent: {res_body}")
                return True
        except Exception as e:
            print(f"[ERROR] Failed to send Telegram notification: {e}")
            return False

    def _send_telegram_review_alert(self, chat_id, message_text):
        bot_token = os.environ.get("TELEGRAM_CLIENTS_BOT_TOKEN")
        if not bot_token or not chat_id:
            print("[WARNING] Telegram clients credentials or chat_id missing, skipping alert.")
            return False
            
        url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
        payload = {
            "chat_id": chat_id,
            "text": message_text,
            "parse_mode": "HTML"
        }
        
        try:
            data = urllib.parse.urlencode(payload).encode("utf-8")
            req = urllib.request.Request(url, data=data, method="POST")
            with urllib.request.urlopen(req, timeout=5) as response:
                res_body = response.read().decode("utf-8")
                print(f"[INFO] Telegram client review alert sent: {res_body}")
                return True
        except Exception as e:
            print(f"[ERROR] Failed to send Telegram client review alert: {e}")
            return False

    def _send_email_notification(self, subject, body_html, recipient_email=None):
        import smtplib
        from email.mime.text import MIMEText
        from email.mime.multipart import MIMEMultipart

        smtp_server = os.environ.get("SMTP_SERVER")
        smtp_port = os.environ.get("SMTP_PORT", "587")
        smtp_user = os.environ.get("SMTP_USER")
        smtp_password = os.environ.get("SMTP_PASSWORD")
        sender_email = os.environ.get("SENDER_EMAIL")
        admin_email = recipient_email or os.environ.get("ADMIN_EMAIL")

        if not all([smtp_server, smtp_user, smtp_password, sender_email, admin_email]):
            print("[WARNING] SMTP configurations missing, skipping email notification.")
            return False

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f"ReviewShield Alerts <{sender_email}>"
            msg["To"] = admin_email

            part = MIMEText(body_html, "html", "utf-8")
            msg.attach(part)

            # Connect to SMTP server
            server = smtplib.SMTP(smtp_server, int(smtp_port), timeout=10)
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.sendmail(sender_email, admin_email, msg.as_string())
            server.quit()
            
            print(f"[INFO] Email notification sent successfully to {admin_email}")
            return True
        except Exception as e:
            print(f"[ERROR] Failed to send Email notification: {e}")
            return False

    def _save_feedback(self, timestamp, client_id, rating, message, phone):
        save_methods = []
        
        # 1. Save to Firestore
        try:
            db = get_firestore_client()
            db.collection("feedback").add({
                "clientId": client_id,
                "rating": rating,
                "message": message,
                "phone": phone,
                "timestamp": timestamp,
                "status": "New"
            })
            save_methods.append("firestore")
        except Exception as e:
            print(f"[WARNING] Firestore save failed: {e}")
            
        # 2. Save to Google Sheets
        creds_json = os.environ.get("GOOGLE_SHEETS_CREDENTIALS")
        spreadsheet_id = os.environ.get("GOOGLE_SPREADSHEET_ID")
        sheet_name = os.environ.get("GOOGLE_SHEET_NAME", "")
        
        is_lead = (client_id == 'LANDING_PAGE_LEAD')
        
        # Load custom spreadsheet ID from Firestore if present
        if not is_lead:
            try:
                db = get_firestore_client()
                client_doc = db.collection('clients').document(client_id).get()
                if client_doc.exists:
                    client_data = client_doc.to_dict()
                    custom_sid = client_data.get("spreadsheetId")
                    if custom_sid:
                        spreadsheet_id = custom_sid
                        print(f"[INFO] Using custom spreadsheet ID from Firestore for client {client_id}: {spreadsheet_id}")
            except Exception as fe:
                print(f"[WARNING] Failed to load custom spreadsheet ID from Firestore: {fe}")
        
        target_sheet = "Leads" if is_lead else sheet_name
        
        if creds_json and spreadsheet_id:
            try:
                import gspread
                from google.oauth2.service_account import Credentials
                
                creds_data = json.loads(creds_json)
                credentials = Credentials.from_service_account_info(
                    creds_data,
                    scopes=[
                        "https://www.googleapis.com/auth/spreadsheets",
                        "https://www.googleapis.com/auth/drive"
                    ]
                )
                gc = gspread.authorize(credentials)
                sh = gc.open_by_key(spreadsheet_id)
                
                worksheet = None
                if target_sheet:
                    try:
                        worksheet = sh.worksheet(target_sheet)
                    except Exception:
                        if is_lead:
                            try:
                                worksheet = sh.add_worksheet(title="Leads", rows="1000", cols="6")
                                worksheet.append_row(["Timestamp", "Client ID", "Rating", "Message", "Phone Number", "Status"])
                            except Exception as create_err:
                                print(f"[WARNING] Failed to create Leads sheet: {create_err}")
                                worksheet = sh.get_worksheet(0)
                        else:
                            worksheet = sh.get_worksheet(0)
                else:
                    worksheet = sh.get_worksheet(0)
                    
                row_data = [timestamp, client_id, rating, message, phone, "New"]
                worksheet.append_row(row_data)
                save_methods.append("google_sheets")
            except Exception as e:
                print(f"[WARNING] Google Sheets save failed: {e}")
                
        # 3. If neither worked, fall back to local CSV
        if not save_methods:
            csv_path = "/tmp/reviewshield_leads.csv" if is_lead else "/tmp/reviewshield_feedback.csv"
            file_exists = os.path.exists(csv_path)
            with open(csv_path, mode="a", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                if not file_exists:
                    writer.writerow(["Timestamp", "Client ID", "Rating", "Message", "Phone Number", "Status"])
                writer.writerow([timestamp, client_id, rating, message, phone, "New"])
            return f"local_csv_fallback ({csv_path})"
            
        return "+".join(save_methods)
