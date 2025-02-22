'use client';

import { useState, useCallback } from 'react';
import {
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
} from '@mui/material';
import {
  Plumbing as PlumbingIcon,
  ElectricBolt as ElectricIcon,
  Build as BricolageIcon,
  CleaningServices as CleaningIcon,
} from '@mui/icons-material';
import PageContainer from '../components/PageContainer';
import { useLoading } from '../components/LoadingOverlay';
import { useNotification } from '../components/Notifications';
import { stripeService } from '../services/stripe';
import { spreadsheetService } from '../services/spreadsheet';

const services = [
  {
    id: 'plomberie',
    title: 'Plomberie',
    icon: PlumbingIcon,
    description: 'Fuite d\'eau, robinet défectueux, chasse d\'eau cassée',
  },
  {
    id: 'electricite',
    title: 'Électricité',
    icon: ElectricIcon,
    description: 'Prise ou interrupteur à remplacer, disjoncteur défaillant',
  },
  {
    id: 'bricolage',
    title: 'Bricolage',
    icon: BricolageIcon,
    description: 'Montage de meuble, fixation d\'étagères',
  },
  {
    id: 'menage',
    title: 'Ménage Express',
    icon: CleaningIcon,
    description: 'Nettoyage après sinistre, vitres, désinfection',
  },
];

const steps = ['Type de service', 'Description', 'Date et heure', 'Confirmation'];

export default function ReservationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const { showLoading, hideLoading, LoadingComponent } = useLoading();
  const { showNotification } = useNotification();

  const handleSubmit = async () => {
    let success = false;
    try {
      showLoading('Traitement de votre réservation en cours...');
      
      // Save reservation to spreadsheet
      const reservationId = await spreadsheetService.createReservation({
        userId: 'user_id', // TODO: Get from auth context
        service: selectedService,
        description,
        datetime: dateTime,
        status: 'pending',
      });

      // Create payment intent
      const { clientSecret } = await stripeService.createPaymentIntent(75); // Fixed price for demo

      // TODO: Implement Stripe Elements for payment
      console.log('Payment intent created:', clientSecret);
      success = true;
    } catch (error) {
      console.error('Error processing reservation:', error);
      showNotification('Une erreur est survenue lors de la réservation. Veuillez réessayer.', 'error');
    } finally {
      hideLoading();
      if (success) {
        showNotification('Votre réservation a été enregistrée avec succès !', 'success');
        setActiveStep(0);
        setSelectedService('');
        setDescription('');
        setDateTime('');
      }
    }
  };

  return (
    <PageContainer
      title="Réserver un service"
      description="Réservez rapidement un service de plomberie, électricité, bricolage ou ménage"
    >
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Grid container spacing={2}>
            {services.map((service) => (
              <Grid item xs={12} sm={6} key={service.id}>
                <Card 
                  raised={selectedService === service.id}
                  sx={{ height: '100%' }}
                >
                  <CardActionArea 
                    onClick={() => setSelectedService(service.id)}
                    sx={{ height: '100%' }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <service.icon sx={{ mr: 1 }} />
                        <Typography variant="h6">{service.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {activeStep === 1 && (
          <TextField
            label="Description du problème"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            required
          />
        )}

        {activeStep === 2 && (
          <TextField
            label="Date et heure souhaitées"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        )}

        {activeStep === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Récapitulatif de votre réservation
            </Typography>
            <Typography>
              Service : {services.find(s => s.id === selectedService)?.title}
            </Typography>
            <Typography>Description : {description}</Typography>
            <Typography>
              Date et heure : {new Date(dateTime).toLocaleString('fr-FR')}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Retour
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={
              (activeStep === 0 && !selectedService) ||
              (activeStep === 1 && !description) ||
              (activeStep === 2 && !dateTime)
            }
          >
            {activeStep === steps.length - 1 ? 'Confirmer et payer' : 'Suivant'}
          </Button>
        </Box>
      </Paper>
      <LoadingComponent />
    </PageContainer>
  );
}
