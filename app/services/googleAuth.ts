import { OAuth2Client } from 'google-auth-library';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

class GoogleAuthService {
  private clientId: string;
  private clientSecret: string;

  constructor() {
    // TODO: Get these from environment variables
    this.clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
  }

  async getAuthUrl(): Promise<string> {
    const oauth2Client = new OAuth2Client(
      this.clientId,
      this.clientSecret,
      `${window.location.origin}/auth/callback`
    );

    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });
  }

  async handleCallback(code: string): Promise<GoogleUser> {
    const oauth2Client = new OAuth2Client(
      this.clientId,
      this.clientSecret,
      `${window.location.origin}/auth/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user information
    const response = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      picture: data.picture,
    };
  }
}

export const googleAuthService = new GoogleAuthService();
