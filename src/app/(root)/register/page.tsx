import { Button, Group } from "@mantine/core";
import Link from "next/link";

import { H1 } from "@/ui/components/typography/Header";
import { P1 } from "@/ui/components/typography/Paragraph";

function RegisterNewPage() {
  return (
    <main className="h-screen w-screen">
      <section className="flex h-full flex-col justify-center gap-12 text-balance px-8 text-center">
        <div className="flex flex-col gap-8">
          <H1>Stay on top of your kopitiam game</H1>
          <P1>
            Get real-time feedback on your operations. Take action faster. Roll
            out best practices where they matter.
          </P1>
        </div>
        <Group gap="xs" justify="center">
          <Button component={Link} href="/register/form">
            Register as a Tenant
          </Button>
          <Button variant="outline" component={Link} href="/admin">
            Dashboard
          </Button>
        </Group>
      </section>
    </main>
  );
}

export default RegisterNewPage;
