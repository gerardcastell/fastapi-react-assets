import { z } from "zod";

export const averageInterestRateSchema = z.object({
  value: z.number(),
});

export type AverageInterestRateT = z.infer<typeof averageInterestRateSchema>;

export class AverageInterestRateEntity implements AverageInterestRateT {
  readonly value: number;

  constructor(value: AverageInterestRateT) {
    AverageInterestRateEntity.validate(value);
    this.value = value.value;
  }

  static validate(value: unknown): asserts value is AverageInterestRateT {
    averageInterestRateSchema.parse(value);
  }
}
