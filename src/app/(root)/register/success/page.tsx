import { Button, Group, Tooltip } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

import payload from "@/backend/payload/payload";
import { Tenant } from "@/backend/payload/payload-types";
import { log } from "@/lib/winston";
import { cn } from "@/ui/utils/tailwind";

import gridStyles from "./page.module.scss";
import QrCodeDisplay from "./QrCodeDisplay";
import Landing from "../../../../ui/components/layout/Landing";

async function getPublisher(publisherId: string) {
  try {
    return await payload.findByID({
      id: publisherId,
      collection: "publishers",
      depth: 1,
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

  return (
    <main className="min-h-dvh w-screen xl:h-dvh">
      <div className="flex h-full flex-col justify-center">
        <section
          className={cn(
            "w-full mx-auto max-w-screen-2xl gap-8 max-xl:text-center max-xl:place-items-center p-8",
            gridStyles["success-grid"]
          )}
        >
          <Landing.TextContainer className="self-end">
            <Landing.TextContainer.Title>
              Welcome to the club!
            </Landing.TextContainer.Title>
            <Landing.TextContainer.Description>
              {tenant.name} is all set up!
            </Landing.TextContainer.Description>
            <Landing.TextContainer.Description>
              Let your customers scan the QR, and you&apos;ll be notified
              immediately of any feedback.
            </Landing.TextContainer.Description>
          </Landing.TextContainer>
          <div className="flex w-full max-w-[512px] flex-col justify-center xl:row-span-2 xl:max-w-screen-lg">
            <QrCodeDisplay publisherId={publisherId}></QrCodeDisplay>
          </div>
          <Group gap="xs" className="self-start xl:mt-4">
            <Button component={Link} href={`/feedback/${publisherId}`}>
              Try it out
            </Button>
            <Tooltip label="Coming soon">
              <Button variant="outline" disabled>
                Download QR
              </Button>
            </Tooltip>
          </Group>
        </section>
      </div>
    </main>
  );
}

export default SuccessPage;
