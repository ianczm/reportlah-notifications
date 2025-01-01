import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default withPayload(nextConfig);
