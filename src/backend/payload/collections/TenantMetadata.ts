import { getId } from "@/backend/utils/payload";

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
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        beforeChange: [
          async ({ siblingData }) => {
            delete siblingData["name"];
          },
        ],
        afterRead: [
          async ({ data, req }) => {
            const tenant = await req.payload.findByID({
              collection: "tenants",
              id: getId(data!.tenant),
            });
            return tenant.name;
          },
        ],
      },
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
