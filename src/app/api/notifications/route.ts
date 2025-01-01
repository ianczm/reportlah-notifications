import { courier } from "@/lib/courier";

export async function POST(request: Request) {
  const { tenantId, optionId, optionTitle } = await request.json();

  const messageResponse = await courier.send({
    message: {
      to: {
        user_id: "ianczm",
      },
      template: "SAKXNG0H1M45GDMT9W6NTEQ7XCMY",
      data: {
        tenantId: tenantId,
        body: `Feedback received for food practice: [${optionId}] ${optionTitle}`,
      },
    },
  });

  return Response.json({ messageResponse }, { status: 200 });
}
