import { getChannels } from "./fetchData";
import RegistrationFormPage from "./RegistrationForm";

import "./page.module.scss";

async function RegisterNewFormPage() {
  const channelGroups = await getChannels();

  return (
    <main className="h-dvh w-screen text-dark-100">
      <RegistrationFormPage data={{ channelGroups }} />
    </main>
  );
}

export default RegisterNewFormPage;
