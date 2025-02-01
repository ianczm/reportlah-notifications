"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QrCode } from "react-qrcode-pretty";

function generateFeedbackLink(publisherId: string) {
  const url = new URL(`/feedback/${publisherId}`, `${window.location.origin}`);
  return url.href;
}

function QrCodeDisplay({ publisherId }: { publisherId: string }) {
  const [feedbackLink, setFeedbackLink] = useState<string>("");

  useEffect(() => {
    const link = generateFeedbackLink(publisherId);
    setFeedbackLink(link);
  }, [publisherId]);

  return (
    <Link
      href={feedbackLink}
      className="block rounded-3xl bg-[#25251C]/0 p-8 transition-colors hover:bg-[#25251C] md:rounded-6xl md:p-16"
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
