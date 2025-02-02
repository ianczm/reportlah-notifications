import { Button, Group, Stack } from "@mantine/core";
import Link from "next/link";

import { Service, Tenant } from "@/backend/payload/payload-types";
import LandingGrid from "@/ui/components/layout/LandingGrid";

import { getAllPublishers } from "./fetchData";
import Landing from "../../../ui/components/layout/Landing";

export default async function Home() {
  const publishers = await getAllPublishers();
  return (
    <main className="h-screen w-screen">
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
        <div className="flex flex-col justify-center max-xl:p-8">
          <Stack>
            {publishers.map((publisher) => {
              const service = publisher.service as Service;
              const tenant = publisher.tenant as Tenant;
              return (
                <Button
                  component={Link}
                  key={publisher.id}
                  href={`/feedback/${publisher.id}`}
                >
                  {service.name} | {tenant.name}
                </Button>
              );
            })}
          </Stack>
        </div>
      </LandingGrid>
    </main>
  );
}
