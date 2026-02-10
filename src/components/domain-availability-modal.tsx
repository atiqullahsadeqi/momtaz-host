"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ShoppingCart, Loader2 } from "lucide-react";
import { useState } from "react";
import DomainRegistrationForm from "./domain-registration-form";

interface DomainResult {
  domain: string;
  available: boolean;
}

interface DomainAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: DomainResult[];
  searchedDomain: string;
  isLoading: boolean;
}

export default function DomainAvailabilityModal({
  isOpen,
  onClose,
  results,
  searchedDomain,
  isLoading,
}: DomainAvailabilityModalProps) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("");

  const handleRegister = (domain: string) => {
    setSelectedDomain(domain);
    setShowRegistrationForm(true);
  };

  const handleBackToResults = () => {
    setShowRegistrationForm(false);
    setSelectedDomain("");
  };

  const handleCloseAll = () => {
    setShowRegistrationForm(false);
    setSelectedDomain("");
    onClose();
  };

  return (
    <>
      {/* Main Results Modal */}
      <Dialog open={isOpen && !showRegistrationForm} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Domain Availability Results
            </DialogTitle>
            <DialogDescription>
              Search results for &quot;{searchedDomain}&quot;
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Checking availability...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {result.available ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      
                      <div>
                        <div className="font-medium">{result.domain}</div>
                        <Badge
                          variant={result.available ? "default" : "secondary"}
                          className={
                            result.available
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {result.available ? "Available" : "Taken"}
                        </Badge>
                      </div>
                    </div>

                    {result.available && (
                      <Button
                        size="sm"
                        onClick={() => handleRegister(result.domain)}
                        className="flex items-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Register
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No results found. Please try a different domain.
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Registration Form Modal */}
      <DomainRegistrationForm
        isOpen={showRegistrationForm}
        onClose={handleCloseAll}
        onBack={handleBackToResults}
        domain={selectedDomain}
      />
    </>
  );
}
