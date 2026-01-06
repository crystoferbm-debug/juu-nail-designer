
import React from 'react';
import type { Appointment, Client, Service } from '../types';

interface AppointmentListProps {
  title: string;
  appointments: Appointment[];
  clients: Client[];
  services: Service[];
}

const AppointmentItem: React.FC<{ appointment: Appointment; client?: Client; service?: Service }> = ({ appointment, client, service }) => {
  const appointmentTime = appointment.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const appointmentDate = appointment.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <img src={client?.avatarUrl} alt={client?.name} className="w-12 h-12 rounded-full mr-4 border-2 border-pink-200" />
        <div>
          <p className="font-bold text-gray-800">{client?.name}</p>
          <p className="text-sm text-gray-500">{service?.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-pink-500">{appointmentTime}</p>
        <p className="text-sm text-gray-500">{appointmentDate}</p>
      </div>
    </div>
  );
};

export const AppointmentList: React.FC<AppointmentListProps> = ({ title, appointments, clients, services }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <div>
        {appointments.length > 0 ? (
          appointments.map(app => {
            const client = clients.find(c => c.id === app.clientId);
            const service = services.find(s => s.id === app.serviceId);
            return <AppointmentItem key={app.id} appointment={app} client={client} service={service} />;
          })
        ) : (
          <p className="text-center text-gray-500 py-4">Nenhum atendimento próximo.</p>
        )}
      </div>
    </div>
  );
};
