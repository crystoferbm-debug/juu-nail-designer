
import React from 'react';
import type { Client } from '../types';
import { PlusIcon } from './icons';

interface ClientListProps {
  clients: Client[];
  onAddClientClick: () => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onAddClientClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Clientes</h3>
        <button 
          onClick={onAddClientClick}
          className="flex items-center bg-pink-100 text-pink-700 px-3 py-1.5 rounded-lg shadow-sm hover:bg-pink-200 transition-all duration-200 text-sm font-semibold"
        >
          <div className="w-5 h-5 mr-1"><PlusIcon /></div>
          <span>Nova Cliente</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map(client => (
          <div key={client.id} className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4 hover:scale-105 transition-transform duration-200">
            <img src={client.avatarUrl} alt={client.name} className="w-16 h-16 rounded-full border-2 border-pink-300" />
            <div>
              <p className="font-bold text-lg text-gray-800">{client.name}</p>
              <p className="text-sm text-gray-500">{client.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};