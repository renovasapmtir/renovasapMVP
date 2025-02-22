import { NextResponse } from 'next/server';
import { stripeService } from '../../services/stripe';
import { spreadsheetService } from '../../services/spreadsheet';

async function checkStripe() {
  try {
    // Try to create a test payment intent with a minimal amount
    await stripeService.createPaymentIntent(1);
    return true;
  } catch (error) {
    console.error('Stripe health check failed:', error);
    return false;
  }
}

async function checkGoogleSheets() {
  try {
    // Try to read user reservations (empty result is fine)
    await spreadsheetService.getUserReservations('health-check');
    return true;
  } catch (error) {
    console.error('Google Sheets health check failed:', error);
    return false;
  }
}

export async function GET() {
  const startTime = Date.now();
  const status = { healthy: true, services: {} as Record<string, boolean> };

  try {
    // Check external services
    const [stripeHealth, sheetsHealth] = await Promise.all([
      checkStripe(),
      checkGoogleSheets(),
    ]);

    status.services = {
      stripe: stripeHealth,
      googleSheets: sheetsHealth,
    };

    // Update overall health status
    status.healthy = Object.values(status.services).every(Boolean);

    return NextResponse.json({
      ...status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      responseTime: Date.now() - startTime,
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        healthy: false,
        error: 'Health check failed',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Run health check every 5 minutes
export const runtime = 'nodejs';
export const revalidate = 300;
