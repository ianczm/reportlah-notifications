"use client";

import { Button, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { use } from "react";

type ReportOption = {
  id: number;
  title: string;
};

function FeedbackPage({ params }: { params: Promise<{ tenandId: string }> }) {
  const { tenantId } = use(params);

  const reportOptions: ReportOption[] = [
    { id: 1, title: "Washing" },
    { id: 2, title: "Serving" },
    { id: 3, title: "Food Prep" },
  ];

  return (
    <main>
      <section className="mx-auto grid h-screen max-w-screen-xl grid-cols-2 items-center gap-8">
        <div>
          <h2 className="mb-4 text-6xl font-extrabold">Feedback Page</h2>
          <p>For tenant: {tenantId}</p>
        </div>
        <div>
          <h2 className="mb-4 text-4xl">Food practices to report</h2>
          <Stack gap="xs">
            {reportOptions.map((option) => (
              <Button
                key={option.id}
                onClick={() =>
                  notifications.show({
                    title: "Feedback sent!",
                    message: `You let ${tenantId} know about ${option.title}.`,
                  })
                }
              >
                {option.title}
              </Button>
            ))}
          </Stack>
        </div>
      </section>
    </main>
  );
}

export default FeedbackPage;
