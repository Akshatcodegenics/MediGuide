
export interface Hospital {
  id: number;
  name: string;
  location: string;
  specialties: string[];
  waitingTime: number; // in minutes
  fees: number; // in INR
  rating: number;
  distance?: number; // in km
  category: 'government' | 'private'; // Added category field
  address?: string;
  contact?: string;
  email?: string;
  website?: string;
  appointmentSteps?: string[];
  estimatedCost?: {
    min: number;
    max: number;
  };
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
  category?: 'all' | 'government' | 'private';
};

export interface NearbyPlace {
  id: number;
  name: string;
  type: 'pharmacy' | 'hotel' | 'food';
  rating: number;
  distance: number;
  address: string;
  priceLevel?: string;
  reviews?: string[];
  images?: string[];
  contact?: string;
  openHours?: string;
  amenities?: string[];
}
