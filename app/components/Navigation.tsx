'use client';

import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { AccountCircle, CalendarToday, History, Subscriptions } from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveIndex = () => {
    switch (pathname) {
      case '/profile':
        return 0;
      case '/reservation':
        return 1;
      case '/historique':
        return 2;
      case '/abonnements':
        return 3;
      default:
        return 1; // Default to reservation
    }
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={getActiveIndex()}
        onChange={(_, newValue) => {
          switch (newValue) {
            case 0:
              router.push('/profile');
              break;
            case 1:
              router.push('/reservation');
              break;
            case 2:
              router.push('/historique');
              break;
            case 3:
              router.push('/abonnements');
              break;
          }
        }}
      >
        <BottomNavigationAction label="Profil" icon={<AccountCircle />} />
        <BottomNavigationAction label="Réservation" icon={<CalendarToday />} />
        <BottomNavigationAction label="Historique" icon={<History />} />
        <BottomNavigationAction label="Abonnements" icon={<Subscriptions />} />
      </BottomNavigation>
    </Paper>
  );
}
