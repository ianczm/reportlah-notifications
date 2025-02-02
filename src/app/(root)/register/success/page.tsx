import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

import payload from "@/backend/payload/payload";
import { Service, Tenant } from "@/backend/payload/payload-types";
import { log } from "@/lib/winston";
import LandingGrid from "@/ui/components/layout/LandingGrid";

import QrCodeDisplay from "./QrCodeDisplay";
import Landing from "../../../../ui/components/layout/Landing";

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
      <LandingGrid>
        {/* Left */}
        <Landing>
          <Landing.TextContainer>
            <Landing.TextContainer.Title>
              Welcome to the club!
            </Landing.TextContainer.Title>
            <Landing.TextContainer.Description>
              {tenant.name} is all set up for {service.name}!
            </Landing.TextContainer.Description>
            <Landing.TextContainer.Description>
              Let your customers scan the QR, and you&apos;ll be notified
              immediately of any feedback.
            </Landing.TextContainer.Description>
          </Landing.TextContainer>
          <Group gap="xs">
            <Button component={Link} href={`/feedback/${publisherId}`}>
              Get started
            </Button>
            <Button variant="outline" component={Link} href="/admin">
              Dashboard
            </Button>
          </Group>
        </Landing>
        {/* Right */}
        <div className="flex w-full flex-col justify-center">
          <QrCodeDisplay publisherId={publisherId}></QrCodeDisplay>
        </div>
      </LandingGrid>
    </main>
  );
}

export default SuccessPage;
