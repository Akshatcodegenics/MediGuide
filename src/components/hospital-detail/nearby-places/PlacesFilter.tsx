
import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Hotel, Utensils, MapPin, SlidersHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlacesFilterProps {
  maxDistance: number;
  setMaxDistance: (value: number) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export const PlacesFilter: React.FC<PlacesFilterProps> = ({
  maxDistance,
  setMaxDistance,
  activeTab,
  setActiveTab,
  sortBy,
  setSortBy
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100"
  >
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h2 className="text-lg font-medium">Nearby Places Filter</h2>
      
      <div className="flex items-center">
        <SlidersHorizontal className="w-4 h-4 mr-2 text-purple-600" />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px] h-8 text-sm bg-white">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="distance">Distance (Nearest)</SelectItem>
            <SelectItem value="rating">Rating (Best)</SelectItem>
            <SelectItem value="price_asc">Price (Lowest)</SelectItem>
            <SelectItem value="price_desc">Price (Highest)</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <div className="col-span-1 md:col-span-3">
        <label className="text-sm text-gray-600 mb-1 block flex justify-between">
          <span>Maximum Distance</span>
          <span className="font-medium">{maxDistance} km</span>
        </label>
        <Slider
          value={[maxDistance]}
          min={1}
          max={100}
          step={1}
          onValueChange={(value) => setMaxDistance(value[0])}
          className="mt-2"
        />
      </div>
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
            <TabsTrigger value="pharmacies">
              <Pill className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="hotels">
              <Hotel className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="food">
              <Utensils className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  </motion.div>
);
