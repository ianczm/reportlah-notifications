import { ColorSchemeSetter } from "@/ui/components/layout/MantineSchemeSetter";

import { getChannels } from "./fetchData";
import RegistrationForm from "./RegistrationForm";

async function RegisterPage() {
  const channelGroups = await getChannels();

  return (
    <main className="min-h-dvh w-screen text-dark-100">
      <ColorSchemeSetter colorScheme="light">
        <RegistrationForm data={{ channelGroups }} />
      </ColorSchemeSetter>
    </main>
  );
}

export default RegisterPage;
