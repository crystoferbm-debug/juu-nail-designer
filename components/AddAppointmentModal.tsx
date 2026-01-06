
import React, { useState, FormEvent, useEffect } from 'react';
import type { Client, Service, Appointment } from '../types';
import { XMarkIcon } from './icons';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  clients: Client[];
  services: Service[];
}

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({ isOpen, onClose, onAddAppointment, clients, services }) => {
  const [clientId, setClientId] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    if (clients.length > 0) setClientId(String(clients[0].id));
    if (services.length > 0) setServiceId(String(services[0].id));
    
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    setDate(now.toISOString().slice(0,10));
    setTime(now.toISOString().slice(11,16));

  }, [isOpen, clients, services]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!clientId || !serviceId || !date || !time) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const appointmentDate = new Date(`${date}T${time}`);

    onAddAppointment({
      clientId: Number(clientId),
      serviceId: Number(serviceId),
      date: appointmentDate
    });
    // Reset form can be done here or in onClose logic
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Novo Agendamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
            <select id="client" value={clientId} onChange={e => setClientId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500">
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">Serviço</label>
            <select id="service" value={serviceId} onChange={e => setServiceId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500">
              {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
              <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500" />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
             <button type="button" onClick={onClose} className="px-6 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">Cancelar</button>
             <button type="submit" className="px-6 py-2 rounded-lg text-white bg-pink-500 hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg">Agendar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
