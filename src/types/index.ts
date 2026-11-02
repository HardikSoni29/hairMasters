export type UserRole = 'client' | 'admin';

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  role: UserRole;
  created_at: string;
}

export type ServiceCategory = 
  | 'Hair Styling'
  | 'Hair Spa & Treatments'
  | 'Skin & Facials'
  | 'Bridal & Makeup'
  | 'Groom Grooming'
  | 'Nail Art';

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  price: number;
  duration_mins: number;
  image_url: string;
  suitable_for?: string;
  includes?: string[];
  created_at?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  rating: number;
  specialties?: string[];
  instagram?: string;
  experience_years?: number;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  user_id: string;
  service_id: string;
  stylist_id?: string | null;
  appointment_date: string;
  status: AppointmentStatus;
  notes?: string;
  created_at: string;
  // Joined relation fields
  service?: Service;
  stylist?: Stylist | null;
  profile?: Profile;
}

export interface BookingFormData {
  category: ServiceCategory;
  serviceId: string;
  addOnIds: string[];
  stylistId: string | 'any';
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
  service: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bridal' | 'Hair Transformations' | 'Men\'s Grooming' | 'Nail Art' | 'Skin Radiance';
  imageUrl: string;
  stylistName: string;
  description: string;
}
