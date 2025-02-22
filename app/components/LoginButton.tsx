'use client';

import { Button } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';

export default function LoginButton() {
  const { user, signIn, signOut } = useAuth();

  const handleAuth = async () => {
    if (user) {
      await signOut();
    } else {
      await signIn();
    }
  };

  return (
    <Button
      variant="contained"
      color={user ? 'secondary' : 'primary'}
      onClick={handleAuth}
      startIcon={!user && <GoogleIcon />}
    >
      {user ? 'Se déconnecter' : 'Connexion avec Google'}
    </Button>
  );
}
