import React from 'react';
import { SimulationProvider } from '../components/simulation/simulation-context';
import { AppLayout } from '../components/layout/app-layout';
import { Dashboard } from '../components/dashboard/dashboard';

export default function DashboardPage() {
  return (
    <SimulationProvider>
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </SimulationProvider>
  );
}
