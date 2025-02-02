import { Button, Group } from "@mantine/core";
import Link from "next/link";

import LandingGrid from "@/ui/components/layout/LandingGrid";

import { getChannels } from "./fetchData";
import RegistrationForm from "./RegistrationForm";
import Landing from "../../../ui/components/layout/Landing";

async function RegistrationPage() {
  const channelGroups = await getChannels();
  return (
    <main className="h-screen w-screen">
      <LandingGrid>
        {/* Left */}
        <Landing>
          <Landing.TextContainer>
            <Landing.TextContainer.Title>
              Stay on top of your kopitiam game
            </Landing.TextContainer.Title>
            <Landing.TextContainer.Description>
              Get real-time feedback on your operations. Take action faster.
              Roll out best practices where they matter.
            </Landing.TextContainer.Description>
          </Landing.TextContainer>
          <Group gap="xs">
            <Button>Register as a Tenant</Button>
            <Button variant="outline" component={Link} href="/admin">
              Dashboard
            </Button>
          </Group>
        </Landing>
        {/* Right */}
        <RegistrationForm channelGroups={channelGroups} />
      </LandingGrid>
    </main>
  );
}

export default RegistrationPage;
