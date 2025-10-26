import { z } from "zod";

export const assetSchema = z.object({
  id: z.string(),
  interestRate: z.number(),
});

export type AssetEntityT = z.infer<typeof assetSchema>;

export class AssetEntity implements AssetEntityT {
  readonly id: string;
  readonly interestRate: number;

  constructor(value: AssetEntityT) {
    AssetEntity.validate(value);
    this.id = value.id;
    this.interestRate = value.interestRate;
  }

  static validate(value: unknown): asserts value is AssetEntityT {
    assetSchema.parse(value);
  }
}
