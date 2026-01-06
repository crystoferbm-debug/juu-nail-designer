
import React from 'react';
import { ChartPieIcon, CalendarIcon, UserGroupIcon, SparklesIcon } from './icons';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: 'dashboard' | 'calendar' | 'clients' | 'services') => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-left text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-pink-500 text-white shadow-lg'
        : 'text-gray-600 hover:bg-pink-100 hover:text-pink-800'
    }`}
  >
    <span className="mr-4">{icon}</span>
    <span className="flex-1">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-white/80 backdrop-blur-lg p-6 shadow-lg flex-col hidden md:flex">
        <div className="flex items-center mb-10">
            <div className="bg-pink-500 p-2 rounded-full mr-3">
                <SparklesIcon />
            </div>
            <h1 className="text-xl font-bold text-gray-800">NailDash</h1>
        </div>
      <nav className="flex flex-col space-y-3">
        <NavItem
          icon={<ChartPieIcon />}
          label="Dashboard"
          isActive={activeView === 'dashboard'}
          onClick={() => setActiveView('dashboard')}
        />
        <NavItem
          icon={<CalendarIcon />}
          label="Agenda"
          isActive={activeView === 'calendar'}
          onClick={() => setActiveView('calendar')}
        />
        <NavItem
          icon={<UserGroupIcon />}
          label="Clientes"
          isActive={activeView === 'clients'}
          onClick={() => setActiveView('clients')}
        />
        <NavItem
          icon={<SparklesIcon />}
          label="Serviços"
          isActive={activeView === 'services'}
          onClick={() => setActiveView('services')}
        />
      </nav>
    </aside>
  );
};
