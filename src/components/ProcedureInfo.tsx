
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { procedures, getProceduresBySpecialty } from "@/data/procedures";
import { Procedure } from "@/types";
import { getUniqueSpecialties } from "@/utils/hospitalUtils";
import { hospitals } from "@/data/hospitals";
import { Clock, FileText, CheckSquare } from "lucide-react";

const ProcedureInfo: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
  
  const specialties = getUniqueSpecialties(hospitals);
  const filteredProcedures = selectedSpecialty 
    ? getProceduresBySpecialty(selectedSpecialty)
    : [];

  return (
    <div className="space-y-6 py-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Learn about medical procedures</h3>
        <p className="text-gray-600 mb-6">
          Select a specialty and procedure to get information about the process,
          required documents, and estimated time.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Medical Specialty
            </label>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Select a specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>{specialty}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Procedure
            </label>
            <Select 
              value={selectedProcedure?.id.toString() || ""} 
              onValueChange={(value) => {
                const procedure = procedures.find(p => p.id.toString() === value);
                setSelectedProcedure(procedure || null);
              }}
              disabled={filteredProcedures.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder={
                  filteredProcedures.length === 0 
                    ? "Select a specialty first" 
                    : "Select a procedure"
                } />
              </SelectTrigger>
              <SelectContent>
                {filteredProcedures.map((procedure) => (
                  <SelectItem key={procedure.id} value={procedure.id.toString()}>
                    {procedure.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {selectedProcedure && (
        <Card>
          <CardHeader>
            <CardTitle>{selectedProcedure.name}</CardTitle>
            <CardDescription>{selectedProcedure.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium flex items-center mb-3">
                <CheckSquare className="w-5 h-5 mr-2 text-purple-600" />
                Procedure Steps
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {selectedProcedure.steps.map((step, index) => (
                  <li key={index} className="pl-2">{step}</li>
                ))}
              </ol>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Required Documents
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {selectedProcedure.requiredDocuments.map((doc, index) => (
                    <li key={index} className="pl-2">{doc}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium flex items-center mb-3">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  Estimated Time
                </h3>
                <p className="text-gray-700">{selectedProcedure.estimatedTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProcedureInfo;
