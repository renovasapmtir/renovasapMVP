interface UserData {
  id: string;
  name: string;
  phone: string;
  address: string;
  access: string;
}

interface Reservation {
  id: string;
  userId: string;
  service: string;
  description: string;
  datetime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

class SpreadsheetService {
  private spreadsheetId: string;

  constructor() {
    // TODO: Get from environment variables
    this.spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_SPREADSHEET_ID || '';
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('googleToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Google Sheets');
    }

    return response.json();
  }

  async saveUser(userData: Omit<UserData, 'id'>): Promise<string> {
    // TODO: Implement actual spreadsheet write
    // For now, we'll just simulate saving to spreadsheet
    console.log('Saving user data:', userData);
    return 'user_' + Date.now();
  }

  async getUser(userId: string): Promise<UserData | null> {
    // TODO: Implement actual spreadsheet read
    // For now, return mock data
    return {
      id: userId,
      name: 'Mock User',
      phone: '+33123456789',
      address: '123 Rue de Paris',
      access: 'Code: 1234',
    };
  }

  async createReservation(reservation: Omit<Reservation, 'id'>): Promise<string> {
    // TODO: Implement actual spreadsheet write
    console.log('Creating reservation:', reservation);
    return 'res_' + Date.now();
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    // TODO: Implement actual spreadsheet read
    // For now, return mock data
    return [
      {
        id: 'res_1',
        userId,
        service: 'Plomberie',
        description: 'Fuite sous évier',
        datetime: new Date().toISOString(),
        status: 'pending',
      },
    ];
  }

  async updateReservationStatus(
    reservationId: string,
    status: Reservation['status']
  ): Promise<void> {
    // TODO: Implement actual spreadsheet update
    console.log('Updating reservation status:', { reservationId, status });
  }
}

export const spreadsheetService = new SpreadsheetService();
