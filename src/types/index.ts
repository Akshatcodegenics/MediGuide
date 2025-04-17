
export interface Hospital {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  waitingTime: number; // in minutes
  fees: number; // in INR
  rating: number;
  distance?: number; // in km
}

export interface Procedure {
  id: number;
  name: string;
  description: string;
  steps: string[];
  requiredDocuments: string[];
  estimatedTime: string;
  specialty: string;
}

export type UserLocation = {
  lat: number;
  lng: number;
  address: string;
};

export type UserPreferences = {
  specialty: string;
  maxFees: number | null;
  maxDistance: number | null;
  maxWaitTime: number | null;
};
