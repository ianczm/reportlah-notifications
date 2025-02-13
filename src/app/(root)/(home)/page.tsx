import { Button, Group, Stack } from "@mantine/core";
import Link from "next/link";

import { Tenant } from "@/backend/payload/payload-types";
import LandingGrid from "@/ui/components/layout/LandingGrid";
import { H3 } from "@/ui/components/typography/Header";

import { getAllPublisherGroups } from "./fetchData";
import Landing from "../../../ui/components/layout/Landing";

export default async function Home() {
  const publisherGroups = await getAllPublisherGroups();
  return (
    <main className="h-dvh w-screen">
      <LandingGrid>
        {/* Left */}
        <Landing>
          <Landing.TextContainer>
            <Landing.TextContainer.Title>
              Welcome to ReportLah!
            </Landing.TextContainer.Title>
            <Landing.TextContainer.Description>
              Here is our list of coffeeshops you can give feedback to.
            </Landing.TextContainer.Description>
          </Landing.TextContainer>
          <Group gap="xs">
            <Button component={Link} href="/register">
              Register as a Tenant
            </Button>
            <Button variant="outline" component={Link} href="/admin">
              Dashboard
            </Button>
          </Group>
        </Landing>
        {/* Right */}
        <div className="flex flex-col justify-center gap-16 max-xl:p-8">
          {publisherGroups.map(({ serviceName, publishers }) => (
            <div key={serviceName} className="flex flex-col gap-8">
              <H3>{serviceName}</H3>
              <Stack key={serviceName}>
                {publishers.map((publisher) => {
                  const tenant = publisher.tenant as Tenant;
                  return (
                    <Button
                      component={Link}
                      key={publisher.id}
                      href={`/feedback/${publisher.id}`}
                      justify="start"
                    >
                      {tenant.name}
                    </Button>
                  );
                })}
              </Stack>
            </div>
          ))}
        </div>
      </LandingGrid>
    </main>
  );
}
