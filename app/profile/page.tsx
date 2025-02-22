'use client';

import { useState } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useLoading } from '../components/LoadingOverlay';
import { useNotification } from '../components/Notifications';
import { spreadsheetService } from '../services/spreadsheet';

interface UserProfile {
  nom: string;
  telephone: string;
  adresse: string;
  acces: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    nom: '',
    telephone: '',
    adresse: '',
    acces: '',
  });

  const { showLoading, hideLoading, LoadingComponent } = useLoading();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    
    try {
      showLoading('Enregistrement de votre profil...');
      // Convert profile data to match spreadsheet service format
      const userData = {
        name: profile.nom,
        phone: profile.telephone,
        address: profile.adresse,
        access: profile.acces,
      };
      await spreadsheetService.saveUser(userData);
      success = true;
    } catch (error) {
      console.error('Error saving profile:', error);
      showNotification('Une erreur est survenue lors de l\'enregistrement.', 'error');
    } finally {
      hideLoading();
      if (success) {
        showNotification('Profil mis à jour avec succès !', 'success');
      }
    }
  };

  return (
    <PageContainer
      title="Mon Profil"
      description="Gérez vos informations personnelles et préférences de contact"
    >
      <Paper sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Nom complet"
            value={profile.nom}
            onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
            fullWidth
            required
          />
          <TextField
            label="Numéro de téléphone"
            value={profile.telephone}
            onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
            fullWidth
            required
            type="tel"
          />
          <TextField
            label="Adresse"
            value={profile.adresse}
            onChange={(e) => setProfile({ ...profile, adresse: e.target.value })}
            fullWidth
            required
            multiline
            rows={2}
          />
          <TextField
            label="Accès (digicode, étage, instructions)"
            value={profile.acces}
            onChange={(e) => setProfile({ ...profile, acces: e.target.value })}
            fullWidth
            multiline
            rows={2}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
          >
            Enregistrer
          </Button>
        </Box>
      </Paper>
      <LoadingComponent />
    </PageContainer>
  );
}
