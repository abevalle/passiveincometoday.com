import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const credentials = {
  type: "service_account",
  project_id: process.env.GOOGLE_SHEETS_PROJECT_ID,
  private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  private_key_id: process.env.GOOGLE_SHEETS_PRIVATE_KEY_ID,
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
  try {
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: SCOPES,
    });
    return await auth.getClient();
  } catch (error) {
    console.error('Auth client error:', error);
    throw new Error('Failed to initialize Google Sheets client');
  }
}

async function ensureSheetExists(sheets) {
  try {
    // Get the spreadsheet
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    // Check if our sheet exists
    const sheet = spreadsheet.data.sheets.find(
      s => s.properties.title === SHEET_NAME
    );

    if (!sheet) {
      // Create the sheet if it doesn't exist
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: SHEET_NAME,
                  gridProperties: {
                    rowCount: 1000,
                    columnCount: 2,
                  },
                },
              },
            },
          ],
        },
      });

      // Add headers to the new sheet
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:B1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [['Email', 'Timestamp']],
        },
      });
    }
  } catch (error) {
    console.error('Error ensuring sheet exists:', error);
    throw error;
  }
}

async function addEmailToSheet(email) {
  try {
    const authClient = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });

    // Ensure the sheet exists before trying to append
    await ensureSheetExists(sheets);

    const values = [[email, new Date().toISOString()]];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:B2`,  // Start after headers
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
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

export async function POST(request) {
  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    await addEmailToSheet(email);

    return NextResponse.json(
      { message: 'Successfully added to VIP list' },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('Error in VIP signup:', error);
    return NextResponse.json(
      { error: 'Failed to add to VIP list. Please try again later.' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
} 