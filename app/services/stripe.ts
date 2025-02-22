interface PaymentIntent {
  clientSecret: string;
  id: string;
}

class StripeService {
  private async fetchWithJsonResponse<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`/api/stripe${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Stripe API');
    }

    return response.json();
  }

  async createPaymentIntent(amount: number): Promise<PaymentIntent> {
    return this.fetchWithJsonResponse<PaymentIntent>('/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  async createSubscription(priceId: string): Promise<{ subscriptionId: string }> {
    return this.fetchWithJsonResponse<{ subscriptionId: string }>(
      '/create-subscription',
      {
        method: 'POST',
        body: JSON.stringify({ priceId }),
      }
    );
  }
}

export const stripeService = new StripeService();
