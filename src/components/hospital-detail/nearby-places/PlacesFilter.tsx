
import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, Hotel, Utensils } from "lucide-react";

interface PlacesFilterProps {
  maxDistance: number;
  setMaxDistance: (value: number) => void;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export const PlacesFilter: React.FC<PlacesFilterProps> = ({
  maxDistance,
  setMaxDistance,
  activeTab,
  setActiveTab
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100"
  >
    <h2 className="text-lg font-medium mb-3">Nearby Places Filter</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <div className="col-span-1 md:col-span-3">
        <label className="text-sm text-gray-600 mb-1 block">Maximum Distance: {maxDistance} km</label>
        <Slider
          value={[maxDistance]}
          min={1}
          max={30}
          step={1}
          onValueChange={(value) => setMaxDistance(value[0])}
          className="mt-2"
        />
      </div>
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pharmacies">
              <Pill className="w-4 h-4 mr-1" />
            </TabsTrigger>
            <TabsTrigger value="hotels">
              <Hotel className="w-4 h-4 mr-1" />
            </TabsTrigger>
            <TabsTrigger value="food">
              <Utensils className="w-4 h-4 mr-1" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  </motion.div>
);
