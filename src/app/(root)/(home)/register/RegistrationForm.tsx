import { Button, PasswordInput, TextInput } from "@mantine/core";

function RegistrationForm() {
  return (
    <div className="flex w-full flex-col justify-end text-dark-100">
      <div className="h-[85vh] rounded-t-6xl bg-light-700 p-16">
        {/* Form */}
        <form className="h-full">
          <div className="flex h-full flex-col justify-between">
            {/* Form Display */}
            <div className="flex flex-col gap-16">
              {/* Form Text */}
              <div className="flex flex-col gap-8">
                <h2 className="font-display text-3xl uppercase">
                  Register as a Tenant
                </h2>
                <p className="text-xl font-bold text-dark-400">
                  Create an account with us, we&apos;ll generate a QR code for
                  your customers to start scanning immediately.
                </p>
              </div>
              {/* Form Inputs */}
              <div className="flex flex-col gap-8">
                <TextInput
                  id="tenant-name"
                  label="Shop Name"
                  placeholder="Enter your shop name"
                  type="text"
                  required
                  size="xl"
                  radius="lg"
                  labelProps={{
                    fz: "md",
                    mb: "xs",
                    fw: "bold",
                  }}
                  classNames={{
                    input:
                      "border-light-600 bg-white text-base font-semibold text-dark-100 placeholder:text-dark-600 focus:border-dark-400",
                  }}
                />
                <TextInput
                  id="email"
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  required
                  size="xl"
                  radius="lg"
                  labelProps={{
                    fz: "md",
                    mb: "xs",
                    fw: "bold",
                  }}
                  classNames={{
                    input:
                      "border-light-600 bg-white text-base font-semibold text-dark-100 placeholder:text-dark-600 focus:border-dark-400",
                  }}
                />
                <PasswordInput
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  required
                  size="xl"
                  radius="lg"
                  labelProps={{
                    fz: "md",
                    mb: "xs",
                    fw: "bold",
                  }}
                  classNames={{
                    input:
                      "border-light-600 text-base bg-white font-semibold text-dark-100 focus-within:border-dark-400",
                    innerInput: "placeholder:text-dark-600",
                    visibilityToggle:
                      "hover:bg-dark-600/15 text-dark-600 hover:text-dark-600",
                  }}
                />
              </div>
            </div>
            {/* Button */}
            <Button
              color="yellow.6"
              c="black"
              size="xl"
              radius="xl"
              fz="md"
              fullWidth
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
