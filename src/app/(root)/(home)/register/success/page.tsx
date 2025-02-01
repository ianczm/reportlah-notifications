import { Button, Group, Tooltip } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

import payload from "@/backend/payload/payload";
import { Service, Tenant } from "@/backend/payload/payload-types";
import { log } from "@/lib/winston";

import LandingContent from "../LandingContent";
import QrCodeDisplay from "./QrCodeDisplay";

async function getPublisher(publisherId: string) {
  try {
    return await payload.findByID({
      id: publisherId,
      collection: "publishers",
    });
  } catch (e) {
    log.warn(`Publisher not found for ${publisherId}.`, { error: e });
    notFound();
  }
}

async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ publisherId: string }>;
}) {
  const { publisherId } = await searchParams;
  const publisher = await getPublisher(publisherId);

  const tenant = publisher.tenant as Tenant;
  const service = publisher.service as Service;

  return (
    <main className="h-screen w-screen bg-dark-100">
      <section className="mx-auto grid size-full max-w-screen-2xl grid-cols-[auto] grid-rows-[auto_auto] px-5 xl:grid-cols-[1fr_1fr] xl:grid-rows-[auto]">
        <LandingContent>
          <LandingContent.Text>
            <LandingContent.Text.Title>
              Welcome to the club!
            </LandingContent.Text.Title>
            <LandingContent.Text.Description>
              {tenant.name} is all set up for {service.name}!
            </LandingContent.Text.Description>
            <LandingContent.Text.Description>
              Let your customers scan the QR, and you&apos;ll be notified
              immediately of any feedback.
            </LandingContent.Text.Description>
          </LandingContent.Text>
          <Group gap="xs">
            <Tooltip label="Coming soon">
              <Button c="black" size="xl" radius="xl" fz="md" disabled>
                Send a test notification
              </Button>
            </Tooltip>
            <Button
              size="xl"
              radius="xl"
              variant="outline"
              fz="md"
              bd="2px solid"
              component={Link}
              href="/admin"
            >
              Dashboard
            </Button>
          </Group>
        </LandingContent>
        <div className="flex w-full flex-col justify-center gap-12">
          <QrCodeDisplay publisherId={publisherId}></QrCodeDisplay>
        </div>
      </section>
    </main>
  );
}

export default SuccessPage;
