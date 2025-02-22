'use client';

import { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
} from '@mui/material';
import PageContainer from '../components/PageContainer';
import { useLoading } from '../components/LoadingOverlay';
import { useNotification } from '../components/Notifications';
import { spreadsheetService } from '../services/spreadsheet';

interface Reservation {
  id: string;
  date: string;
  service: string;
  description: string;
  status: 'completed' | 'pending' | 'cancelled';
}

// Example data - will be replaced with Google Spreadsheet data
const mockReservations: Reservation[] = [
  {
    id: '1',
    date: '2024-02-22T10:00:00',
    service: 'Plomberie',
    description: 'Fuite sous évier',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-02-23T14:30:00',
    service: 'Électricité',
    description: 'Remplacement prise murale',
    status: 'pending',
  },
];

export default function HistoriquePage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState(false);
  const { showLoading, hideLoading, LoadingComponent } = useLoading();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        showLoading('Chargement de l\'historique...');
        const data = await spreadsheetService.getUserReservations('user_id'); // TODO: Get from auth context
        // Map the data to match our local interface
        const mappedData: Reservation[] = data.map(res => ({
          id: res.id,
          date: res.datetime,
          service: res.service,
          description: res.description,
          status: res.status as 'completed' | 'pending' | 'cancelled',
        }));
        setReservations(mappedData);
        setError(false);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError(true);
        showNotification('Impossible de charger l\'historique des interventions.', 'error');
      } finally {
        hideLoading();
      }
    };

    fetchReservations();
  }, [showLoading, hideLoading, showNotification]);

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: Reservation['status']) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <PageContainer
      title="Historique des interventions"
      description="Consultez l'historique de vos interventions et leur statut"
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  {new Date(reservation.date).toLocaleString('fr-FR')}
                </TableCell>
                <TableCell>{reservation.service}</TableCell>
                <TableCell>{reservation.description}</TableCell>
                <TableCell>
                  <Chip
                    label={getStatusText(reservation.status)}
                    color={getStatusColor(reservation.status) as any}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
            {reservations.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Aucune intervention à afficher
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Une erreur est survenue lors du chargement de l&apos;historique.
          Veuillez réessayer plus tard.
        </Alert>
      )}
      <LoadingComponent />
    </PageContainer>
  );
}
