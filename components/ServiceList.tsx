
import React from 'react';
import type { Service } from '../types';

export const ServiceList: React.FC<{ services: Service[] }> = ({ services }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
       <h3 className="text-xl font-bold text-gray-800 mb-4">Serviços</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-pink-100">
              <th className="p-4 text-gray-600 font-bold">Serviço</th>
              <th className="p-4 text-gray-600 font-bold">Duração</th>
              <th className="p-4 text-gray-600 font-bold text-right">Preço</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="border-b border-pink-50 hover:bg-pink-50/50 transition-colors">
                <td className="p-4 font-semibold text-gray-800">{service.name}</td>
                <td className="p-4 text-gray-600">{service.duration} min</td>
                <td className="p-4 font-bold text-pink-500 text-right">R$ {service.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};