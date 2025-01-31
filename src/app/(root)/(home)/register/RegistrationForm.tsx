"use client";

import {
  Button,
  Checkbox,
  PasswordInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { registerAction } from "@/backend/actions/register";
import { REGISTRATION_FORM_SCHEMA } from "@/backend/features/register/validator";
import { Channel } from "@/backend/payload/payload-types";
import PlacesAutocomplete from "@/ui/components/inputs/PlacesAutocomplete";
import { cn } from "@/ui/utils/tailwind";

const fieldNamesByPage: Record<number, string[]> = {
  0: ["tenantName", "location", "email"],
  1: ["password", "confirmPassword"],
  2: ["channelId", "recipient", "terms"],
};

type RegistrationFormProps = {
  channels: Channel[];
};

function RegistrationForm({ channels }: RegistrationFormProps) {
  const lastPage = 2;
  const [currentPage, setCurrentPage] = useState(0);
  const { executeAsync, isPending } = useAction(registerAction);

  const form = useForm({
    name: "registration-form",
    validate: zodResolver(REGISTRATION_FORM_SCHEMA),
    validateInputOnBlur: true,
    initialValues: {
      tenantName: "",
      location: {
        longtitude: Infinity,
        latitude: Infinity,
      },
      email: "",
      password: "",
      confirmPassword: "",
      channelId: "",
      recipient: "",
      terms: false,
    },
  });

  function handleNextPage() {
    form.clearErrors();

    const errors = fieldNamesByPage[currentPage]
      .map((fieldName, index) => ({
        index,
        fieldName,
        ...form.validateField(fieldName),
      }))
      .filter(({ hasError }) => hasError)
      .toSorted((a, b) => a.index - b.index);

    if (errors.some(({ hasError }) => hasError)) {
      form.getInputNode(errors[0].fieldName)!.focus();
    } else {
      setCurrentPage((page) => {
        if (page === lastPage) return page;
        return page + 1;
      });
    }
  }

  function handlePrevPage() {
    setCurrentPage((page) => {
      if (page === 0) return page;
      return page - 1;
    });
  }

  async function handleFormSubmit(values: typeof form.values) {
    await executeAsync(values);
  }

  return (
    <div className="flex w-full flex-col justify-end text-dark-100">
      <div className="h-[85vh] rounded-t-6xl bg-light-700 p-16">
        {/* Form */}
        <form className="h-full" onSubmit={form.onSubmit(handleFormSubmit)}>
          <div className="flex h-full flex-col justify-between">
            {/* Form Display */}
            <div className="flex flex-col gap-16">
              {/* Form Text */}
              <div className="flex flex-col gap-8">
                <h2 className="font-display text-3xl uppercase">
                  Register as a Tenant
                </h2>
                <p className="text-xl font-bold text-dark-400">
                  Create an account with us. We&apos;ll generate a QR code for
                  your customers to provide feedback.
                </p>
              </div>
              {/* Form Inputs */}
              <div
                className={cn("flex flex-col gap-8", {
                  hidden: currentPage !== 0,
                })}
              >
                <TextInput
                  id="tenantName"
                  name="tenantName"
                  key={form.key("tenantName")}
                  {...form.getInputProps("tenantName")}
                  label="Shop Name"
                  placeholder="Enter your shop name"
                  type="text"
                  required
                />
                <PlacesAutocomplete
                  form={form}
                  name="location"
                  label="Shop Location"
                  placeholder="Enter your shop location coordinates"
                />
                <TextInput
                  id="email"
                  name="email"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                  label="Email"
                  placeholder="your@email.com"
                  type="email"
                  required
                />
              </div>
              <div
                className={cn("flex flex-col gap-8", {
                  hidden: currentPage !== 1,
                })}
              >
                <PasswordInput
                  id="password"
                  name="password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                  label="Password"
                  placeholder="Enter your password"
                  required
                />
                <PasswordInput
                  id="confirmPassword"
                  name="confirmPassword"
                  key={form.key("confirmPassword")}
                  {...form.getInputProps("confirmPassword")}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div
                className={cn("flex flex-col gap-8", {
                  hidden: currentPage !== 2,
                })}
              >
                <Select
                  id="channelId"
                  name="channelId"
                  key={form.key("channelId")}
                  {...form.getInputProps("channelId")}
                  label="Notifications Channel"
                  placeholder="Select your channel"
                  data={channels.map((channel) => ({
                    value: channel.id,
                    label: channel.name,
                  }))}
                  radius="lg"
                  size="xl"
                  required
                />
                <TextInput
                  id="recipient"
                  name="recipient"
                  key={form.key("recipient")}
                  {...form.getInputProps("recipient")}
                  label="Recipient"
                  placeholder="Enter your identifier"
                  type="text"
                  required
                />
                <Checkbox
                  id="terms"
                  name="terms"
                  key={form.key("terms")}
                  {...form.getInputProps("terms", { type: "checkbox" })}
                  label="I agree to the terms and conditions"
                  required
                />
              </div>
            </div>
            {/* Button */}
            <div>
              <Stack gap="xs">
                {currentPage > 0 && (
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={handlePrevPage}
                    classNames={{ inner: "text-black" }}
                  >
                    Back
                  </Button>
                )}
                {currentPage < lastPage && (
                  <Button fullWidth onClick={handleNextPage}>
                    Next
                  </Button>
                )}
                {currentPage === lastPage && (
                  <Button fullWidth type="submit" loading={isPending}>
                    Submit
                  </Button>
                )}
              </Stack>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
