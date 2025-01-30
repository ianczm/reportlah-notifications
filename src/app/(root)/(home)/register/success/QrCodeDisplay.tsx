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
      className="flex aspect-square h-fit items-center justify-center rounded-6xl bg-[#25251C]/0 transition-colors hover:bg-[#25251C]"
    >
      <QrCode
        value={feedbackLink}
        level="H"
        variant="gravity"
        divider
        bgColor="transparent"
        size={512}
        padding={80}
        color="#fff7e7"
        bgRounded
      />
    </Link>
  );
}

export default QrCodeDisplay;
