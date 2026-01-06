
export interface Client {
  id: number;
  name: string;
  phone: string;
  avatarUrl: string;
}

export interface Service {
  id: number;
  name: string;
  duration: number; // in minutes
  price: number;
}

export interface Appointment {
  id: number;
  clientId: number;
  serviceId: number;
  date: Date;
  status: 'scheduled' | 'completed' | 'canceled';
}
