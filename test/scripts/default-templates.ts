import payload from "@/backend/payload/payload";

function buildTemplateBody(channel: string) {
  return {
    templateId: "SAKXNG0H1M45GDMT9W6NTEQ7XCMY",
    templateData: {
      body: `[Default Template: ${channel}] You have received {{count}} count(s) of [{{eventTypeName}}] {{eventTagName}}.`,
      title: "[{{serviceName}}] {{eventTypeName}} Received",
    },
  };
}

export async function seedDefaultTemplates() {
  const [existingDefaultTemplates, channels] = await Promise.all([
    payload.find({
      collection: "default-templates",
      depth: 0,
    }),
    payload.find({
      collection: "channels",
      depth: 0,
    }),
  ]);

  const templatedChannels = new Set(
    existingDefaultTemplates.docs.map((template) => template.channel)
  );

  console.log({ message: "Found templated channels.", templatedChannels });

  const remainingChannels = channels.docs.filter(
    (channel) => !templatedChannels.has(channel.id)
  );

  console.log({ message: "Computed remaining channels.", remainingChannels });

  const templatePromises = remainingChannels.map((channel) =>
    payload.create({
      collection: "default-templates",
      data: {
        channel: channel.id,
        data: buildTemplateBody(channel.name),
      },
    })
  );

  const createdTemplates = await Promise.all(templatePromises);

  console.log({
    message: `Created ${createdTemplates.length} new default templates.`,
  });
}

await seedDefaultTemplates();
process.exit(0);
