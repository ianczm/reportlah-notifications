import { Button, Group, Stack } from "@mantine/core";
import Link from "next/link";

import Landing from "@/ui/components/layout/Landing";
import LandingGrid from "@/ui/components/layout/LandingGrid";

import FeedbackButtonGroup from "./FeedbackButtonGroup";
import { getFeedbackTagData } from "./fetchData";

async function FeedbackPage({
  params,
}: {
  params: Promise<{
    eventTypeSlug: string;
    publisherId: string;
  }>;
}) {
  const { publisherId, eventTypeSlug } = await params;
  const { eventTags, publisher, tenant } = await getFeedbackTagData(
    publisherId,
    eventTypeSlug
  );

  return (
    <main className="h-screen w-screen">
      <LandingGrid>
        {/* Left */}
        <Landing>
          <Landing.TextContainer>
            <Landing.TextContainer.Title>
              Give feedback
            </Landing.TextContainer.Title>
            <Landing.TextContainer.Description>
              You&apos;re giving feedback to {publisher.name}
            </Landing.TextContainer.Description>
          </Landing.TextContainer>
          <Group gap="xs">
            <Button component={Link} href="/">
              Back to Home
            </Button>
            <Button variant="outline" component={Link} href="/admin">
              Dashboard
            </Button>
          </Group>
        </Landing>
        {/* Right */}
        <div className="flex flex-col justify-center max-xl:p-8">
          <Stack>
            {eventTags && (
              <FeedbackButtonGroup
                eventTags={eventTags}
                publisher={publisher}
                tenant={tenant}
              />
            )}
          </Stack>
        </div>
      </LandingGrid>
    </main>
  );
}

export default FeedbackPage;
