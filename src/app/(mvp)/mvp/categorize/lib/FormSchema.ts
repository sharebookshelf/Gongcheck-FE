import { z } from "zod";

export const FormSchema = z.object({
  items: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
