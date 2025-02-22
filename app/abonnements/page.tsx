'use client';

import {
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useLoading } from '../components/LoadingOverlay';
import { useNotification } from '../components/Notifications';
import { stripeService } from '../services/stripe';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  frequency: string;
  features: string[];
}

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Essentiel',
    description: 'Services de base à la demande',
    price: 0,
    frequency: '',
    features: [
      'Accès à tous les services',
      'Paiement à l\'intervention',
      'Disponibilité sous 48h',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Services réguliers avec avantages',
    price: 39.99,
    frequency: '/mois',
    features: [
      'Accès prioritaire aux services',
      'Intervention sous 24h',
      '1 intervention mensuelle incluse',
      'Remise de 15% sur les services additionnels',
    ],
  },
];

export default function AbonnementsPage() {
  const { showLoading, hideLoading, LoadingComponent } = useLoading();
  const { showNotification } = useNotification();

  const handleSubscribe = async (planId: string) => {
    try {
      showLoading('Traitement de votre abonnement...');
      
      if (planId === 'basic') {
        showNotification('Vous utilisez déjà le plan Essentiel.', 'info');
        return;
      }

      const { subscriptionId } = await stripeService.createSubscription(planId);
      showNotification('Abonnement souscrit avec succès !', 'success');

      // TODO: Update user's subscription status in the spreadsheet
      console.log('Subscription created:', subscriptionId);
    } catch (error) {
      console.error('Error creating subscription:', error);
      showNotification(
        'Une erreur est survenue lors de la souscription. Veuillez réessayer.',
        'error'
      );
    } finally {
      hideLoading();
    }
  };

  return (
    <PageContainer
      title="Abonnements"
      description="Choisissez la formule qui correspond à vos besoins"
    >
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          Choisissez la formule qui vous convient le mieux pour bénéficier de nos services de manière régulière.
        </Typography>

        <Grid container spacing={3}>
          {plans.map((plan) => (
            <Grid item xs={12} md={6} key={plan.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {plan.description}
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    {plan.price > 0 ? `${plan.price}€${plan.frequency}` : 'Gratuit'}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {plan.features.map((feature, index) => (
                      <Typography component="li" key={index} sx={{ mb: 1 }}>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={plan.price > 0 ? 'contained' : 'outlined'}
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    {plan.price > 0 ? 'S\'abonner' : 'Plan actuel'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Les abonnements sont sans engagement et peuvent être annulés à tout moment.
        </Typography>
      </Paper>
      <LoadingComponent />
    </PageContainer>
  );
}
