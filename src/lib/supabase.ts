import { createClient } from '@supabase/supabase-js';
import { INITIAL_SERVICES, INITIAL_STYLISTS } from './mockData';
import { Appointment, Profile, Service, Stylist } from '../types';

// Environment variables provided for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szdytmelbhxsjalsmzva.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_OhnDovaegyvASQGlmKajBA_cnHx-K7e';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ==============================================================================
// Hybrid Data Access Layer:
// Queries live Supabase database first, with fallback to initial luxury seed data
// if remote tables haven't been seeded yet.
// ==============================================================================

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('price', { ascending: true });

    if (error || !data || data.length === 0) {
      if (error) console.info('Supabase: Fetching fallback services (table not migrated yet):', error.message);
      return INITIAL_SERVICES;
    }
    return data as Service[];
  } catch (err) {
    console.warn('Supabase fetch failed, using local catalog:', err);
    return INITIAL_SERVICES;
  }
}

export async function getStylists(): Promise<Stylist[]> {
  try {
    const { data, error } = await supabase
      .from('stylists')
      .select('*')
      .order('rating', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.info('Supabase: Fetching fallback stylists:', error.message);
      return INITIAL_STYLISTS;
    }
    return data as Stylist[];
  } catch (err) {
    console.warn('Supabase fetch failed, using local stylists:', err);
    return INITIAL_STYLISTS;
  }
}

export async function getAppointments(userId?: string, isAdmin: boolean = false): Promise<Appointment[]> {
  try {
    let query = supabase
      .from('appointments')
      .select(`
        *,
        service:services(*),
        stylist:stylists(*),
        profile:profiles(*)
      `)
      .order('appointment_date', { ascending: false });

    if (!isAdmin && userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error || !data) {
      // Fallback to local storage for demo experience if table doesn't exist
      const local = localStorage.getItem('hm_luxury_appointments');
      if (local) {
        const parsed = JSON.parse(local) as Appointment[];
        if (!isAdmin && userId) {
          return parsed.filter(a => a.user_id === userId);
        }
        return parsed;
      }
      return [];
    }

    return data as Appointment[];
  } catch (err) {
    console.warn('Failed to fetch appointments from Supabase:', err);
    const local = localStorage.getItem('hm_luxury_appointments');
    return local ? JSON.parse(local) : [];
  }
}

export async function createAppointment(appointment: Omit<Appointment, 'id' | 'created_at'>): Promise<Appointment> {
  const newId = crypto.randomUUID();
  const createdDate = new Date().toISOString();
  const newRecord: Appointment = {
    ...appointment,
    id: newId,
    created_at: createdDate,
  };

  try {
    const { data, error } = await supabase
      .from('appointments')
      .insert([{
        id: newId,
        user_id: appointment.user_id,
        service_id: appointment.service_id,
        stylist_id: appointment.stylist_id || null,
        appointment_date: appointment.appointment_date,
        status: appointment.status || 'pending',
        notes: appointment.notes || '',
      }])
      .select(`
        *,
        service:services(*),
        stylist:stylists(*)
      `)
      .single();

    if (error || !data) {
      console.warn('Supabase insert note (fallback stored in localStorage):', error?.message);
      saveToLocalAppointments(newRecord);
      return newRecord;
    }

    return data as Appointment;
  } catch (err) {
    console.warn('Saving appointment locally as fallback:', err);
    saveToLocalAppointments(newRecord);
    return newRecord;
  }
}

export async function updateAppointmentStatus(id: string, status: Appointment['status']): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.warn('Failed to update Supabase appointment status, updating local storage:', error.message);
    }
  } catch (err) {
    console.warn('Local update fallback for status:', err);
  }

  // Also sync localStorage
  const local = localStorage.getItem('hm_luxury_appointments');
  if (local) {
    const list = JSON.parse(local) as Appointment[];
    const updated = list.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem('hm_luxury_appointments', JSON.stringify(updated));
  }
  return true;
}

function saveToLocalAppointments(record: Appointment) {
  const existing = localStorage.getItem('hm_luxury_appointments');
  const list: Appointment[] = existing ? JSON.parse(existing) : [];
  list.unshift(record);
  localStorage.setItem('hm_luxury_appointments', JSON.stringify(list));
}
