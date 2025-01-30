"use client";

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
    <QrCode
      value={feedbackLink}
      size={1024}
      level="H"
      variant="gravity"
      divider
      bgColor="transparent"
      padding={80}
      color="#fff7e7"
      bgRounded
    />
  );
}

export default QrCodeDisplay;
