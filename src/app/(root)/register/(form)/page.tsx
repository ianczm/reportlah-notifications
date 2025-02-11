import { getChannels } from "./fetchData";
import RegistrationForm from "./RegistrationForm";

import "./page.module.scss";

async function RegisterPage() {
  const channelGroups = await getChannels();

  return (
    <main className="min-h-dvh w-screen text-dark-100">
      <RegistrationForm data={{ channelGroups }} />
    </main>
  );
}

export default RegisterPage;
