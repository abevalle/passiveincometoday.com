import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
  private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
  private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY,
  client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  client_id: process.env.GOOGLE_SHEETS_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}`,
  universe_domain: "googleapis.com"
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
const SHEET_NAME = 'VIP Signups';

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  return auth.getClient();
}

export async function addEmailToSheet(email) {
  try {
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    const values = [[email, new Date().toISOString()]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:B`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding email to sheet:', error);
    throw error;
  }
} 