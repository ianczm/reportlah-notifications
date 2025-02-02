"use client";

import { Button, Group, Stack } from "@mantine/core";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

import { getAllPublishersAction } from "@/backend/actions/payload";
import { Publisher, Service, Tenant } from "@/backend/payload/payload-types";

import LandingContent from "./register/LandingContent";

export default function Home() {
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const { execute } = useAction(getAllPublishersAction, {
    onSuccess: ({ data }) => setPublishers(data!),
  });

  useEffect(execute, [execute]);

  return (
    <main className="h-screen w-screen">
      <section className="mx-auto grid size-full max-w-screen-2xl grid-cols-[auto] grid-rows-[auto_auto] gap-5 xl:grid-cols-[1fr_1fr]  xl:grid-rows-[auto] xl:px-5">
        <LandingContent>
          <LandingContent.Text>
            <LandingContent.Text.Title>
              Welcome to ReportLah!
            </LandingContent.Text.Title>
            <LandingContent.Text.Description>
              Here is our list of coffeeshops you can give feedback to.
            </LandingContent.Text.Description>
          </LandingContent.Text>
          <Group gap="xs">
            <Button component={Link} href="/register">
              Register as a Tenant
            </Button>
            <Button variant="outline" component={Link} href="/admin">
              Dashboard
            </Button>
          </Group>
        </LandingContent>
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
      </section>
    </main>
  );
}
