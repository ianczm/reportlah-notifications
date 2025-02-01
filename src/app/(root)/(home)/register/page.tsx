import { Button, Group } from "@mantine/core";
import Link from "next/link";

import payload from "@/backend/payload/payload";

import LandingContent from "./LandingContent";
import RegistrationForm from "./RegistrationForm";

async function RegistrationPage() {
  const channels = await payload.find({
    collection: "channels",
    depth: 0,
  });

  return (
    <main className="h-screen w-screen">
      <section className="mx-auto grid size-full max-w-screen-2xl grid-cols-2 gap-5 px-5">
        <LandingContent>
          <LandingContent.Text>
            <LandingContent.Text.Title>
              Stay on top of your kopitiam game
            </LandingContent.Text.Title>
            <LandingContent.Text.Description>
              Get real-time feedback on your operations. Take action faster.
              Roll out best practices where they matter.
            </LandingContent.Text.Description>
          </LandingContent.Text>
          <Group gap="xs" mr={160}>
            <Button>Register as a Tenant</Button>
            <Button variant="outline" component={Link} href="/admin">
              Dashboard
            </Button>
          </Group>
        </LandingContent>
        <RegistrationForm channels={channels.docs} />
      </section>
    </main>
  );
}

export default RegistrationPage;
