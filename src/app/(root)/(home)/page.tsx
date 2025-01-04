"use client";

import { Anchor, Button, Group } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { QrCode } from "react-qrcode-pretty";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [feedbackLink, setFeedbackLink] = useState<string | null>(null);

  const buildFeedbackLink = () => {
    const url = new URL(`/feedback/${uuid()}`, `${window.location.origin}`);
    return url.href;
  };

  const generateQrCode = () => {
    setFeedbackLink(buildFeedbackLink());
  };

  return (
    <main>
      <section className="mx-auto grid h-screen max-w-screen-xl grid-cols-2 items-center gap-8">
        {/* Header */}
        <div>
          <h2 className="text-6xl font-extrabold">Generate QR Code</h2>
          <Group mt="md" gap="xs">
            <Button variant="filled" onClick={generateQrCode}>
              Generate QR
            </Button>
            <Button component={Link} variant="light" href="/admin">
              Dashboard
            </Button>
          </Group>
        </div>
        {/* QR Outlet */}
        <div>
          <h2 className="text-4xl">Your QR</h2>
          {feedbackLink && (
            <div>
              <Anchor
                component={Link}
                className="my-4 inline-block"
                href={feedbackLink}
                underline="hover"
                target="_blank"
              >
                {feedbackLink}
              </Anchor>
              <QrCode
                value={feedbackLink}
                level="Q"
                variant="gravity"
                divider
              />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
