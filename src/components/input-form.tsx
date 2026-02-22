"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const inputSchema = z.object({
  input: z
    .string()
    .min(10, "Headline must be at least 10 characters")
    .max(200, "Headline is too long"),
});

type InputData = z.infer<typeof inputSchema>;

const InputForm = () => {
  const form = useForm<InputData>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      input: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: InputData) => {
    const params = new URLSearchParams({ headline: data.input });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <form
      className="flex items-end gap-5 w-full max-w-xl"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="input"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel
                htmlFor="input"
                className="px-3"
              >
                News Headline
              </FieldLabel>
              <Input
                id="input"
                {...field}
                aria-invalid={fieldState.invalid}
                placeholder="Enter a news headline"
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button
        type="submit"
        size="lg"
        disabled={form.formState.isSubmitting}
      >
        Generate
      </Button>
    </form>
  );
};

export default InputForm;
