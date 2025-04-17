
import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getHospitalById, getNearbyPlaces } from "@/data/hospitals";
import { Hospital, NearbyPlace } from "@/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Globe, Clock, DollarSign, ChevronLeft, Star, Pill, Hotel, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// For demo purposes. In a real application, this would be stored in environment variables
// or fetched from a server-side API
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNrZzVvN2EyNTA5bmwyeG11OWg1NGY5OTYifQ.JVG_vlk4_G1LYUc4QvlzYg';

// Mock locations for hospitals
const hospitalLocations: Record<number, {lat: number, lng: number}> = {
  1: {lat: 28.6139, lng: 77.2090}, // Apollo Delhi
  2: {lat: 19.0760, lng: 72.8777}, // Fortis Mumbai
  5: {lat: 28.5672, lng: 77.2100}, // AIIMS Delhi
};

const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [pharmacies, setPharmacies] = useState<NearbyPlace[]>([]);
  const [hotels, setHotels] = useState<NearbyPlace[]>([]);
  const [foodPlaces, setFoodPlaces] = useState<NearbyPlace[]>([]);
  const [activeTab, setActiveTab] = useState("info");

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (id) {
      const hospitalId = parseInt(id);
      const hospitalData = getHospitalById(hospitalId);
      
      if (hospitalData) {
        setHospital(hospitalData);
        
        // Fetch nearby places for this hospital
        setPharmacies(getNearbyPlaces(hospitalId, 'pharmacy'));
        setHotels(getNearbyPlaces(hospitalId, 'hotel'));
        setFoodPlaces(getNearbyPlaces(hospitalId, 'food'));
      }
    }
  }, [id]);

  useEffect(() => {
    if (hospital && mapContainer.current && activeTab === "map" && !map.current) {
      const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });

      map.current.addControl(new mapboxgl.NavigationControl());
      
      // Add marker for the hospital
      new mapboxgl.Marker({ color: "#8b5cf6" })
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${hospital.name}</h3>`))
        .addTo(map.current);
      
      return () => {
        map.current?.remove();
        map.current = null;
      };
    }
  }, [hospital, activeTab]);

  if (!hospital) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading hospital details...</p>
        </div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">
          <Button variant="ghost" className="mb-4 group">
            <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hospital List
          </Button>
        </Link>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="col-span-2">
          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-100 overflow-hidden">
            <div className="h-40 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
              <h1 className="text-3xl font-bold text-white">{hospital.name}</h1>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {hospital.name}
                    <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {hospital.category === "government" ? "Government" : "Private"}
                    </span>
                  </CardTitle>
                  <CardDescription>{hospital.location}</CardDescription>
                </div>
                <div className="flex items-center bg-yellow-100 px-3 py-2 rounded-full">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 mr-1" />
                  <span className="font-medium text-lg">{hospital.rating}</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="info" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="appointment">Book Appointment</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby Places</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium">Address</h3>
                            <p className="text-gray-600">{hospital.address}</p>
                          </div>
                        </div>
                        
                        {hospital.contact && (
                          <div className="flex items-start">
                            <Phone className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                            <div>
                              <h3 className="font-medium">Contact</h3>
                              <p className="text-gray-600">{hospital.contact}</p>
                            </div>
                          </div>
                        )}
                        
                        {hospital.email && (
                          <div className="flex items-start">
                            <Mail className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                            <div>
                              <h3 className="font-medium">Email</h3>
                              <p className="text-gray-600">{hospital.email}</p>
                            </div>
                          </div>
                        )}
                        
                        {hospital.website && (
                          <div className="flex items-start">
                            <Globe className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                            <div>
                              <h3 className="font-medium">Website</h3>
                              <p className="text-blue-600 hover:underline">
                                <a href={`https://${hospital.website}`} target="_blank" rel="noopener noreferrer">
                                  {hospital.website}
                                </a>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Clock className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium">Waiting Time</h3>
                            <p className="text-gray-600">{hospital.waitingTime} minutes</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <DollarSign className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                          <div>
                            <h3 className="font-medium">Consultation Fee</h3>
                            <p className="text-gray-600">₹{hospital.fees}</p>
                          </div>
                        </div>
                        
                        {hospital.estimatedCost && (
                          <div className="flex items-start">
                            <DollarSign className="w-5 h-5 text-gray-500 mr-3 mt-1" />
                            <div>
                              <h3 className="font-medium">Estimated Cost Range</h3>
                              <p className="text-gray-600">
                                ₹{hospital.estimatedCost.min} - ₹{hospital.estimatedCost.max}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {hospital.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="appointment">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Appointment Booking Process</h2>
                      {hospital.appointmentSteps && (
                        <ol className="space-y-4">
                          {hospital.appointmentSteps.map((step, index) => (
                            <motion.li 
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex"
                            >
                              <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center mr-3">
                                {index + 1}
                              </span>
                              <div className="bg-white p-4 rounded-lg shadow-sm flex-grow border border-gray-100">
                                {step}
                              </div>
                            </motion.li>
                          ))}
                        </ol>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Required Documents</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Government-issued photo ID (Aadhar, PAN, Driving License)</li>
                        <li>Previous medical records (if any)</li>
                        <li>Insurance details (if applicable)</li>
                        <li>Referral letter (if applicable)</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="map">
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      {hospital.name} is located at {hospital.address}.
                    </p>
                    <div ref={mapContainer} className="h-[400px] rounded-lg shadow-md" />
                  </div>
                </TabsContent>
                
                <TabsContent value="nearby">
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center mb-4">
                        <Pill className="w-5 h-5 text-green-600 mr-2" />
                        <h3 className="text-lg font-medium">Nearby Pharmacies</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pharmacies.map((place) => (
                          <Card key={place.id} className="hover:shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{place.name}</CardTitle>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                                  <span className="text-sm">{place.rating}</span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{place.address}</span>
                              </div>
                              <div className="text-sm text-blue-600 mt-1">
                                {place.distance} km away
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <Hotel className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-lg font-medium">Nearby Hotels</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hotels.map((place) => (
                          <Card key={place.id} className="hover:shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{place.name}</CardTitle>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                                  <span className="text-sm">{place.rating}</span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{place.address}</span>
                              </div>
                              <div className="text-sm text-blue-600 mt-1">
                                {place.distance} km away
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-4">
                        <Utensils className="w-5 h-5 text-orange-600 mr-2" />
                        <h3 className="text-lg font-medium">Food Centers</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {foodPlaces.map((place) => (
                          <Card key={place.id} className="hover:shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">{place.name}</CardTitle>
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                                  <span className="text-sm">{place.rating}</span>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{place.address}</span>
                              </div>
                              <div className="text-sm text-blue-600 mt-1">
                                {place.distance} km away
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} className="col-span-1">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-indigo-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Having trouble booking an appointment or need more information?
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Hospital
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-cyan-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Hospital Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Wait Time</span>
                  <span className="font-semibold text-blue-700">{hospital.waitingTime} mins</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consultation Fee</span>
                  <span className="font-semibold text-blue-700">₹{hospital.fees}</span>
                </div>
                <div className="h-px bg-gray-200"></div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Patient Rating</span>
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-700 mr-1">{hospital.rating}</span>
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HospitalDetail;
