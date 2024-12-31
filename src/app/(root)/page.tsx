"use client";

import { Button } from "@mantine/core";
import { useState } from "react";
import { QrCode } from "react-qrcode-pretty";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);

  return (
    <main>
      <section className="mx-auto grid h-screen max-w-screen-xl grid-cols-2 items-center gap-8">
        {/* Header */}
        <div>
          <h2 className="text-6xl font-extrabold">Generate QR Code</h2>
          <Button
            variant="filled"
            mt="md"
            onClick={() => setQrCodeValue(uuid())}
          >
            Generate
          </Button>
        </div>
        {/* QR Outlet */}
        <div>
          <h2 className="text-4xl">Your QR</h2>
          {qrCodeValue && (
            <div>
              <p className="my-4">{qrCodeValue}</p>
              <QrCode value={qrCodeValue} level="Q" variant="gravity" divider />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
