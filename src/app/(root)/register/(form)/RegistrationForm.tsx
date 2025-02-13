"use client";

import { useForm, zodResolver } from "@mantine/form";
import { useAction } from "next-safe-action/hooks";
import { JSX, useState } from "react";

import { registerAction } from "@/backend/actions/register";
import { REGISTRATION_FORM_SCHEMA } from "@/backend/features/register/validator";

import Step1 from "./Step1";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import { PageHandlers, StepPageProps } from "./types";

const pages: Record<number, (props: StepPageProps) => JSX.Element> = {
  1: Step1,
  // 2: Step2,
  2: Step3,
  3: Step4,
  4: Step5,
  5: Step6,
};

const fieldNamesByPage: Record<number, string[]> = {
  1: ["email"],
  2: ["name", "password", "confirmPassword"],
  3: ["tenantName"],
  4: ["location"],
  5: ["channelId", "recipient", "terms"],
};

const totalPages = 5;

function RegistrationForm({ data }: Pick<StepPageProps, "data">) {
  const [currentPage, setCurrentPage] = useState(1);

  const { executeAsync, isPending } = useAction(registerAction);

  const form = useForm({
    name: "registration-form",
    validate: zodResolver(REGISTRATION_FORM_SCHEMA),
    validateInputOnBlur: true,
    initialValues: {
      tenantName: "",
      name: "",
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

    if (errors.length > 0) {
      const firstErrorFieldname = errors[0].fieldName;
      if (firstErrorFieldname !== "location") {
        const inputNode = form.getInputNode(firstErrorFieldname);
        inputNode!.focus();
      }
    } else {
      if (currentPage !== totalPages) setCurrentPage((prev) => prev + 1);
    }
  }

  async function handleFormSubmit(values: typeof form.values) {
    await executeAsync(values);
  }

  const pageHandlers: PageHandlers = {
    next: handleNextPage,
    prev: () => {
      if (currentPage > 0) setCurrentPage((prev) => prev - 1);
    },
  };

  return (
    <div className="h-dvh w-screen text-dark-100">
      <form className="h-dvh" onSubmit={form.onSubmit(handleFormSubmit)}>
        {Object.entries(pages).map(([page, PageComponent]) => (
          <PageComponent
            step={parseInt(page)}
            totalSteps={totalPages}
            key={page}
            data={data}
            form={form}
            pageHandlers={pageHandlers}
            isPending={isPending}
            hidden={parseInt(page) !== currentPage}
          />
        ))}
      </form>
    </div>
  );
}

export default RegistrationForm;
