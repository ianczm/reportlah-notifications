"use client";

import { Skeleton } from "@mantine/core";
import Link from "next/link";
import { QrCode } from "react-qrcode-pretty";

import { useLocation } from "@/ui/hooks/useLocation";

function generateFeedbackLink(publisherId: string, location: Location) {
  const url = new URL(`/feedback/${publisherId}`, `${location.origin}`);
  return url.href;
}

function QrCodeDisplay({ publisherId }: { publisherId: string }) {
  const location = useLocation();

  if (!location) {
    return (
      <Skeleton className="aspect-square w-full rounded-3xl md:rounded-6xl" />
    );
  }

  const feedbackLink = generateFeedbackLink(publisherId, location);
  return (
    <Link
      href={feedbackLink}
      className="block rounded-3xl border border-[#25251C]/50 bg-[#25251C]/30 p-8 transition-colors hover:border-light-600/10 hover:bg-[#25251C] md:rounded-6xl md:p-16"
    >
      <QrCode
        value={feedbackLink}
        level="H"
        variant="gravity"
        divider
        bgColor="transparent"
        size={1024}
        canvasProps={{
          className: "w-full h-full",
        }}
        color="#fff7e7"
        bgRounded
      />
    </Link>
  );
}

export default QrCodeDisplay;
