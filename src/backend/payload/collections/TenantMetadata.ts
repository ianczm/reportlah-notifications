import type { CollectionConfig } from "payload";

export const TenantMetadata: CollectionConfig = {
  slug: "tenantMetadata",
  admin: {
    useAsTitle: "name",
    group: "Metadata",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "tenant",
      type: "relationship",
      relationTo: "tenants",
      required: true,
      unique: true,
    },
    {
      name: "location",
      type: "point",
      required: true,
    },
  ],
};
