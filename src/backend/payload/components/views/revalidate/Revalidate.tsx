import { DefaultTemplate } from "@payloadcms/next/templates";
import { Button, Gutter } from "@payloadcms/ui";
import { revalidatePath } from "next/cache";

import { log } from "@/lib/winston";

import type { AdminViewProps } from "payload";

export const RevalidateView: React.FC<AdminViewProps> = ({
  initPageResult,
  params,
  searchParams,
}) => {
  async function doRevalidate() {
    "use server";
    log.info("Performing full revalidation...");
    revalidatePath("/", "layout");
  }

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter>
        <h1>Revalidation Panel</h1>
        <p>This will revalidate all pages.</p>
        <form action={doRevalidate}>
          <Button type="submit">Revalidate all</Button>
        </form>
      </Gutter>
    </DefaultTemplate>
  );
};
