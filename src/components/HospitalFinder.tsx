
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Hospital, UserLocation, UserPreferences } from "@/types";
import { hospitals } from "@/data/hospitals";
import { filterHospitals, sortHospitals, getUniqueSpecialties, getUniqueLocations } from "@/utils/hospitalUtils";
import HospitalList from "@/components/HospitalList";
import ProcedureInfo from "@/components/ProcedureInfo";
import { MapPin, Clock, DollarSign } from "lucide-react";

const HospitalFinder: React.FC = () => {
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [sortOption, setSortOption] = useState<'rating' | 'fees' | 'waitingTime' | 'distance'>('rating');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    specialty: "",
    maxFees: null,
    maxWaitTime: null,
    maxDistance: null,
  });
  
  const specialties = getUniqueSpecialties(hospitals);
  const locations = getUniqueLocations(hospitals);

  useEffect(() => {
    // Apply filters and sorting when preferences or sort option changes
    const filtered = filterHospitals(hospitals, userPreferences, userLocation);
    const sorted = sortHospitals(filtered, sortOption);
    setFilteredHospitals(sorted);
  }, [userPreferences, sortOption, userLocation]);

  const handleSpecialtyChange = (value: string) => {
    setUserPreferences(prev => ({ ...prev, specialty: value }));
  };
  
  const handleMaxFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setUserPreferences(prev => ({ ...prev, maxFees: value }));
  };
  
  const handleMaxWaitTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setUserPreferences(prev => ({ ...prev, maxWaitTime: value }));
  };
  
  const handleMaxDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setUserPreferences(prev => ({ ...prev, maxDistance: value }));
  };

  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoadingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: "Your location"
        });
        toast({
          title: "Success",
          description: "Your location has been detected",
        });
        setIsLoadingLocation(false);
      },
      error => {
        toast({
          title: "Error",
          description: `Failed to get your location: ${error.message}`,
          variant: "destructive",
        });
        setIsLoadingLocation(false);
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Hospital Finder</CardTitle>
          <CardDescription className="text-center text-lg">
            Find the best hospitals based on your health needs and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="search">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="search">Search Hospitals</TabsTrigger>
              <TabsTrigger value="procedures">Medical Procedures</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Medical Specialty
                  </label>
                  <Select value={userPreferences.specialty} onValueChange={handleSpecialtyChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Maximum Consultation Fee (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Any budget"
                    value={userPreferences.maxFees ?? ""}
                    onChange={handleMaxFeesChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Maximum Waiting Time (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="Any waiting time"
                    value={userPreferences.maxWaitTime ?? ""}
                    onChange={handleMaxWaitTimeChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Location
                  </label>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={detectUserLocation} 
                      disabled={isLoadingLocation}
                      className="flex items-center gap-2"
                    >
                      <MapPin size={16} />
                      {isLoadingLocation ? "Detecting..." : "Detect Location"}
                    </Button>
                    
                    {userLocation && (
                      <div className="flex-1 flex items-center text-sm">
                        <span className="ml-2">Location detected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {userLocation && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Maximum Distance (km)
                  </label>
                  <Input
                    type="number"
                    placeholder="Any distance"
                    value={userPreferences.maxDistance ?? ""}
                    onChange={handleMaxDistanceChange}
                  />
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Sort Results By
                </label>
                <Select value={sortOption} onValueChange={(value: any) => setSortOption(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="fees">Lowest Fees</SelectItem>
                    <SelectItem value="waitingTime">Shortest Waiting Time</SelectItem>
                    {userLocation && <SelectItem value="distance">Nearest Location</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="procedures">
              <ProcedureInfo />
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center">
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Results</h3>
              <p className="text-sm text-gray-500">{filteredHospitals.length} hospitals found</p>
            </div>
            <HospitalList hospitals={filteredHospitals} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HospitalFinder;
