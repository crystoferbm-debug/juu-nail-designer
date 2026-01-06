
import React from 'react';
import { PlusIcon } from './icons';

interface HeaderProps {
  title: string;
  onAdd: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onAdd }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      <button 
        onClick={onAdd}
        className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600 transition-all duration-300 transform hover:scale-105"
      >
        <PlusIcon />
        <span className="ml-2 hidden sm:inline">Adicionar</span>
      </button>
    </div>
  );
};
