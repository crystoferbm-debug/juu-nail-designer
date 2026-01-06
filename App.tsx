
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { StatCard } from './components/StatCard';
import { AppointmentList } from './components/AppointmentList';
import { ClientList } from './components/ClientList';
import { ServiceList } from './components/ServiceList';
import { AddAppointmentModal } from './components/AddAppointmentModal';
import { AddClientModal } from './components/AddClientModal';
import type { Client, Service, Appointment } from './types';
import { CalendarIcon, UserGroupIcon, SparklesIcon } from './components/icons';

const App: React.FC = () => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const [clients, setClients] = useState<Client[]>([
    { id: 1, name: 'Ana Silva', phone: '(11) 98765-4321', avatarUrl: 'https://picsum.photos/id/1011/100/100' },
    { id: 2, name: 'Beatriz Costa', phone: '(21) 91234-5678', avatarUrl: 'https://picsum.photos/id/1012/100/100' },
    { id: 3, name: 'Carla Dias', phone: '(31) 95555-8888', avatarUrl: 'https://picsum.photos/id/1013/100/100' },
    { id: 4, name: 'Daniela Souza', phone: '(41) 99999-7777', avatarUrl: 'https://picsum.photos/id/1014/100/100' },
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Manicure Clássica', duration: 45, price: 30 },
    { id: 2, name: 'Pedicure Clássica', duration: 60, price: 40 },
    { id: 3, name: 'Unha de Gel', duration: 120, price: 150 },
    { id: 4, name: 'Spa dos Pés', duration: 75, price: 80 },
    { id: 5, name: 'Esmaltação em Gel', duration: 60, price: 90 },
  ]);

  const createAppointmentDate = (dayOffset: number, hour: number) => {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    date.setHours(hour, 0, 0, 0);
    return date;
  };

  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: 1, clientId: 1, serviceId: 3, date: createAppointmentDate(1, 10), status: 'scheduled' },
    { id: 2, clientId: 2, serviceId: 1, date: createAppointmentDate(1, 14), status: 'scheduled' },
    { id: 3, clientId: 3, serviceId: 2, date: createAppointmentDate(2, 11), status: 'scheduled' },
    { id: 4, clientId: 4, serviceId: 5, date: createAppointmentDate(0, 16), status: 'scheduled' },
    { id: 5, clientId: 1, serviceId: 4, date: createAppointmentDate(3, 9), status: 'scheduled' },
    { id: 6, clientId: 2, serviceId: 1, date: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), status: 'completed' },
  ]);
  
  const handleAddAppointment = useCallback((newAppointment: Omit<Appointment, 'id' | 'status'>) => {
    setAppointments(prev => [
      ...prev,
      {
        ...newAppointment,
        id: prev.length > 0 ? Math.max(...prev.map(a => a.id)) + 1 : 1,
        status: 'scheduled',
      }
    ]);
    setIsAppointmentModalOpen(false);
  }, []);

  const handleAddClient = useCallback(({ name, phone, serviceId, date }: { name: string; phone: string; serviceId: number; date: Date }) => {
    const newClientId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const newClient: Client = {
      id: newClientId,
      name,
      phone,
      avatarUrl: `https://picsum.photos/seed/${newClientId}/100/100` 
    };
    setClients(prev => [...prev, newClient]);

    const newAppointment: Appointment = {
      id: appointments.length > 0 ? Math.max(...appointments.map(a => a.id)) + 1 : 1,
      clientId: newClientId,
      serviceId: serviceId,
      date: date,
      status: 'scheduled'
    };
    setAppointments(prev => [...prev, newAppointment]);
    setIsClientModalOpen(false);
  }, [clients, appointments]);

  const upcomingAppointments = appointments
    .filter(a => a.status === 'scheduled' && a.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="bg-pink-50 text-gray-800 min-h-screen">
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <Header title="NailDash" onAdd={() => setIsAppointmentModalOpen(true)} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<UserGroupIcon />} title="Total de Clientes" value={clients.length} />
          <StatCard icon={<CalendarIcon />} title="Próximos Atendimentos" value={upcomingAppointments.length} />
          <StatCard icon={<SparklesIcon />} title="Serviços Oferecidos" value={services.length} />
        </div>
        <div className="space-y-8">
          <AppointmentList title="Próximos Atendimentos" appointments={upcomingAppointments.slice(0, 5)} clients={clients} services={services} />
          <ClientList clients={clients} onAddClientClick={() => setIsClientModalOpen(true)} />
          <ServiceList services={services} />
        </div>
      </main>
      <AddAppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        onAddAppointment={handleAddAppointment}
        clients={clients}
        services={services}
      />
      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onAddClient={handleAddClient}
        services={services}
      />
    </div>
  );
};

export default App;