"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2, SendHorizonal } from "lucide-react";

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
      className="flex items-start gap-5 w-full max-w-xl max-sm:flex-col"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="input"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
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
        <span className="max-sm:hidden">Generate </span>
        {form.formState.isSubmitting ? (
          <Loader2 className="animate-spin" />
        ) : (
          <SendHorizonal />
        )}
      </Button>
    </form>
  );
};

export default InputForm;
