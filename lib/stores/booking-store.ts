import { create } from 'zustand'
import type { Service, Doctor, PatientData } from '@/types'

interface BookingStore {
  step: number
  selectedService: Service | null
  selectedDoctor: Doctor | null
  selectedDate: string | null
  selectedTime: string | null
  patientData: PatientData
  setStep: (step: number) => void
  setService: (service: Service) => void
  setDoctor: (doctor: Doctor) => void
  setSchedule: (date: string, time: string) => void
  setPatientData: (data: PatientData) => void
  reset: () => void
}

const initialPatient: PatientData = { name: '', phone: '', email: '', notes: '' }

export const useBookingStore = create<BookingStore>((set) => ({
  step: 1,
  selectedService: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedTime: null,
  patientData: initialPatient,
  setStep: (step) => set({ step }),
  setService: (service) => set({ selectedService: service, selectedDoctor: null, selectedDate: null, selectedTime: null, step: 2 }),
  setDoctor: (doctor) => set({ selectedDoctor: doctor, selectedDate: null, selectedTime: null, step: 3 }),
  setSchedule: (date, time) => set({ selectedDate: date, selectedTime: time, step: 4 }),
  setPatientData: (patientData) => set({ patientData, step: 5 }),
  reset: () => set({ step: 1, selectedService: null, selectedDoctor: null, selectedDate: null, selectedTime: null, patientData: initialPatient }),
}))
