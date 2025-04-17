import { Hospital, UserPreferences, UserLocation } from "@/types";

export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return Math.round(d * 10) / 10; // Round to 1 decimal place
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

// Mock locations for hospitals - in a real application, these would come from a database
const hospitalLocations: Record<string, {lat: number, lng: number}> = {
  "Delhi": {lat: 28.6139, lng: 77.2090},
  "Mumbai": {lat: 19.0760, lng: 72.8777},
  "Bangalore": {lat: 12.9716, lng: 77.5946},
  "Gurugram": {lat: 28.4595, lng: 77.0266},
  "Pune": {lat: 18.5204, lng: 73.8567},
  "Vellore": {lat: 12.9165, lng: 79.1325},
};

export const filterHospitals = (
  hospitals: Hospital[],
  preferences: UserPreferences,
  userLocation: UserLocation | null
): Hospital[] => {
  let filteredHospitals = [...hospitals];
  
  // Filter by specialty
  if (preferences.specialty && preferences.specialty !== "All") {
    filteredHospitals = filteredHospitals.filter(hospital => 
      hospital.specialties.some(s => s.toLowerCase() === preferences.specialty.toLowerCase())
    );
  }
  
  // Filter by category
  if (preferences.category && preferences.category !== "all") {
    filteredHospitals = filteredHospitals.filter(hospital => 
      hospital.category === preferences.category
    );
  }
  
  // Calculate distances if user location is available
  if (userLocation) {
    filteredHospitals = filteredHospitals.map(hospital => {
      const hospitalLoc = hospitalLocations[hospital.location];
      if (hospitalLoc) {
        return {
          ...hospital,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            hospitalLoc.lat,
            hospitalLoc.lng
          )
        };
      }
      return hospital;
    });
    
    // Filter by distance if preference is set
    if (preferences.maxDistance) {
      filteredHospitals = filteredHospitals.filter(
        hospital => hospital.distance !== undefined && hospital.distance <= preferences.maxDistance!
      );
    }
  }
  
  // Filter by fees
  if (preferences.maxFees) {
    filteredHospitals = filteredHospitals.filter(
      hospital => hospital.fees <= preferences.maxFees!
    );
  }
  
  // Filter by waiting time
  if (preferences.maxWaitTime) {
    filteredHospitals = filteredHospitals.filter(
      hospital => hospital.waitingTime <= preferences.maxWaitTime!
    );
  }
  
  return filteredHospitals;
};

export const sortHospitals = (
  hospitals: Hospital[],
  sortBy: 'fees' | 'waitingTime' | 'rating' | 'distance'
): Hospital[] => {
  const sortedHospitals = [...hospitals];
  
  switch (sortBy) {
    case 'fees':
      return sortedHospitals.sort((a, b) => a.fees - b.fees);
    case 'waitingTime':
      return sortedHospitals.sort((a, b) => a.waitingTime - b.waitingTime);
    case 'rating':
      return sortedHospitals.sort((a, b) => b.rating - a.rating);
    case 'distance':
      // Sort by distance only if it's available
      return sortedHospitals.sort((a, b) => {
        if (a.distance !== undefined && b.distance !== undefined) {
          return a.distance - b.distance;
        }
        return 0;
      });
    default:
      return sortedHospitals;
  }
};

export const getUniqueSpecialties = (hospitals: Hospital[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  hospitals.forEach(hospital => {
    hospital.specialties.forEach(specialty => {
      specialtiesSet.add(specialty);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};

export const getUniqueLocations = (hospitals: Hospital[]): string[] => {
  const locationsSet = new Set<string>();
  
  hospitals.forEach(hospital => {
    locationsSet.add(hospital.location);
  });
  
  return Array.from(locationsSet).sort();
};
