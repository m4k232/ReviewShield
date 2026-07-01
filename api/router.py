import json
import os
import csv
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler

class handler(BaseHTTPRequestHandler):
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
        
        if not client_id or rating is None or not message:
            self._send_json(400, {
                "status": "error",
                "message": "Missing required fields: client_id, rating, message"
            })
            return
            
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

    def _save_feedback(self, timestamp, client_id, rating, message, phone):
        creds_json = os.environ.get("GOOGLE_SHEETS_CREDENTIALS")
        spreadsheet_id = os.environ.get("GOOGLE_SPREADSHEET_ID")
        sheet_name = os.environ.get("GOOGLE_SHEET_NAME", "")
        
        # If env variables are present, authenticate and write to Google Sheets
        if creds_json and spreadsheet_id:
            try:
                # Dynamic imports to allow running fallback without dependencies installed
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
                
                # Open spreadsheet
                sh = gc.open_by_key(spreadsheet_id)
                if sheet_name:
                    worksheet = sh.worksheet(sheet_name)
                else:
                    worksheet = sh.get_worksheet(0)
                    
                # Append feedback row
                # Columns: Timestamp | Client ID | Rating | Message | Phone Number | Status (New)
                row_data = [timestamp, client_id, rating, message, phone, "New"]
                worksheet.append_row(row_data)
                return "google_sheets"
                
            except Exception as e:
                # Wrap Google Sheets errors
                raise RuntimeError(f"Google Sheets error: {str(e)}")
        else:
            # Fallback to local CSV (useful for local development and testing)
            csv_path = "/tmp/reviewshield_feedback.csv"
            file_exists = os.path.exists(csv_path)
            
            with open(csv_path, mode="a", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                if not file_exists:
                    # Write header
                    writer.writerow(["Timestamp", "Client ID", "Rating", "Message", "Phone Number", "Status"])
                writer.writerow([timestamp, client_id, rating, message, phone, "New"])
                
            # Log local save to stdout (will appear in local dev server logs)
            print(f"[LOCAL FALLBACK] Saved to {csv_path}: {timestamp} | {client_id} | {rating} | {message} | {phone}")
            return f"local_csv_fallback ({csv_path})"
