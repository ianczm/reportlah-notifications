"use client";

import { Anchor, Button, Group, Space, Stack } from "@mantine/core";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { MouseEventHandler, useEffect, useState } from "react";
import { QrCode } from "react-qrcode-pretty";
import { v4 as uuid } from "uuid";

import { getAllPublishersAction } from "@/backend/actions/payload";
import { Publisher, Service, Tenant } from "@/backend/payload/payload-types";

export default function Home() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [feedbackLink, setFeedbackLink] = useState<string | null>(null);

  const { execute } = useAction(getAllPublishersAction, {
    onSuccess: ({ data }) => setPublishers(data!),
  });

  useEffect(execute, [execute]);

  const buildFeedbackLink = () => {
    const url = new URL(`/feedback/${uuid()}`, `${window.location.origin}`);
    return url.href;
  };

  const setFeedbackLinkForPublisher = (publisher: Publisher) => {
    const url = new URL(
      `/feedback/${publisher.id}`,
      `${window.location.origin}`
    );
    setFeedbackLink(url.href);
  };

  const generateQrCode =
    (active: boolean): MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      if (!active) {
        e.preventDefault();
      } else {
        setFeedbackLink(buildFeedbackLink());
      }
    };

  return (
    <main>
      <section className="mx-auto grid h-screen max-w-screen-xl grid-cols-2 items-center gap-8">
        {/* Header */}
        <div>
          <h2 className="text-6xl font-extrabold">Generate QR Code</h2>
          <Group mt="md" gap="xs">
            <Button
              variant="filled"
              onClick={generateQrCode(false)}
              data-disabled
            >
              Generate QR
            </Button>
            <Button component={Link} variant="light" href="/admin">
              Dashboard
            </Button>
          </Group>
          <Space h="xl" />
          <Stack>
            {publishers.map((publisher) => {
              const service = publisher.service as Service;
              const tenant = publisher.tenant as Tenant;
              return (
                <Button
                  key={publisher.id}
                  onClick={() => setFeedbackLinkForPublisher(publisher)}
                >
                  {service.name} | {tenant.name}
                </Button>
              );
            })}
          </Stack>
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
