
import React from 'react';
import type { Appointment, Client, Service } from '../types';

interface CalendarViewProps {
    appointments: Appointment[];
    clients: Client[];
    services: Service[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({ appointments, clients, services }) => {
    const today = new Date();
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const getAppointmentsForDay = (day: Date) => {
        return appointments
            .filter(app => app.date.toDateString() === day.toDateString())
            .sort((a, b) => a.date.getTime() - b.date.getTime());
    };

    const renderDay = (dayIndex: number) => {
        const date = new Date(today);
        date.setDate(today.getDate() + dayIndex);
        const dayAppointments = getAppointmentsForDay(date);

        const isToday = date.toDateString() === today.toDateString();

        return (
            <div key={dayIndex} className="bg-white/50 rounded-lg p-4 flex-1 min-w-[200px]">
                <div className={`text-center mb-4 ${isToday ? 'font-bold text-pink-600' : 'text-gray-700'}`}>
                    <p className="text-sm">{daysOfWeek[date.getDay()]}</p>
                    <p className={`text-2xl ${isToday ? 'bg-pink-500 text-white rounded-full w-10 h-10 mx-auto flex items-center justify-center' : ''}`}>{date.getDate()}</p>
                </div>
                <div className="space-y-2">
                    {dayAppointments.map(app => {
                        const client = clients.find(c => c.id === app.clientId);
                        const service = services.find(s => s.id === app.serviceId);
                        return (
                            <div key={app.id} className="bg-pink-100 p-2 rounded-md border-l-4 border-pink-500 text-xs">
                                <p className="font-bold text-pink-800">{app.date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                                <p className="text-gray-700">{client?.name}</p>
                                <p className="text-gray-500 truncate">{service?.name}</p>
                            </div>
                        )
                    })}
                     {dayAppointments.length === 0 && <p className="text-center text-xs text-gray-400 pt-4">Nenhum horário marcado</p>}
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Esta Semana</h3>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {Array.from({ length: 7 }).map((_, i) => renderDay(i))}
            </div>
        </div>
    );
};
