"use client";

import { Button } from "@mantine/core";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

import PlacesAutocomplete from "@/ui/components/inputs/PlacesAutocomplete";
import { H2 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";
import { GoogleMapsApiProvider } from "@/ui/providers/GoogleMapsApi";
import { cn } from "@/ui/utils/tailwind";

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
  const isShopLocationChanged = shopLocation !== singaporeLocation;

  return (
    <GoogleMapsApiProvider>
      <div
        className={cn("relative h-screen", {
          hidden: hidden,
        })}
      >
        <div className="absolute h-screen w-screen">
          <Map
            zoom={isShopLocationChanged ? 16 : 12}
            center={shopLocation}
            controlled
            {...controlOptions}
          >
            {isShopLocationChanged && <Marker position={shopLocation} />}
          </Map>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className="relative z-10 flex flex-col gap-8 border-b border-light-800/40 bg-light-700/40 p-8 pt-16 drop-shadow-md backdrop-blur-md">
            <P1 className="text-sm uppercase tracking-wider text-dark-400">
              Step 5 / 6
            </P1>
            <H2>Set up your first shop</H2>
            <P1 className="text-dark-400">Where is your shop located?</P1>
          </div>
          <div className="relative z-10 flex flex-col gap-8 border-t border-light-800/40 bg-light-700/40 p-8 pb-16 drop-shadow-md backdrop-blur-md">
            <PlacesAutocomplete
              form={form}
              name="location"
              placeholder="Enter your shop address"
              onCoordinatesSelect={setShopLocation}
            />
            <Button onClick={pageHandlers.next} fullWidth>
              Next
            </Button>
          </div>
        </div>
      </div>
    </GoogleMapsApiProvider>
  );
}

export default Step5;
