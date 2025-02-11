"use client";

import { Button } from "@mantine/core";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PlacesAutocomplete from "@/ui/components/inputs/PlacesAutocomplete";
import { GoogleMapsApiProvider } from "@/ui/providers/GoogleMapsApi";
import { cn } from "@/ui/utils/tailwind";

import { RegistrationFormStep } from "./RegistrationFormStep";
import { StepPageProps } from "./types";

const singaporeLocation = {
  lat: 1.35,
  lng: 103.82,
};

const controlOptions = {
  zoomControl: false,
  scaleControl: false,
  rotateControl: false,
  cameraControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

function Step5({ form, pageHandlers, hidden }: StepPageProps) {
  const [shopLocation, setShopLocation] = useState(singaporeLocation);
  const [isShopLocationChanged, setShopLocationChanged] = useState(false);

  function handleCoordinatesSelect(coordinates: { lat: number; lng: number }) {
    setShopLocationChanged(true);
    setShopLocation(coordinates);
  }

  return (
    <GoogleMapsApiProvider>
      <div
        className={cn("relative h-full", {
          hidden: hidden,
        })}
      >
        <div className="absolute h-full w-screen">
          <Map
            zoom={isShopLocationChanged ? 16 : 12}
            center={shopLocation}
            controlled
            {...controlOptions}
          >
            {isShopLocationChanged && <Marker position={shopLocation} />}
          </Map>
        </div>
        <RegistrationFormStep
          className="flex h-full flex-col justify-between"
          hidden={false}
        >
          <RegistrationFormStep.HeaderSection className="relative z-10 border-b border-light-800/40 bg-light-700/70 drop-shadow-md backdrop-blur-md">
            <PlacesAutocomplete
              form={form}
              name="location"
              placeholder="Enter your shop address"
              onCoordinatesSelect={handleCoordinatesSelect}
            />
          </RegistrationFormStep.HeaderSection>
          <RegistrationFormStep.InputSection className="relative z-10 border-t border-light-800/40 bg-light-700/70 drop-shadow-md backdrop-blur-md">
            <Button onClick={pageHandlers.next} fullWidth>
              Next
            </Button>
          </RegistrationFormStep.InputSection>
        </RegistrationFormStep>
      </div>
    </GoogleMapsApiProvider>
  );
}

export default Step5;
