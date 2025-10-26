import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import type { Control } from "react-hook-form";
import { RHFTextField } from "../../../../../shared/design-system/form/TextField";
import type { AssetsFormSchemaType } from "./schemas";
import DeleteIcon from "@mui/icons-material/Delete";
interface AssetFormProps {
  control: Control<AssetsFormSchemaType>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}

export const AssetForm = ({
  control,
  index,
  onRemove,
  canRemove,
}: AssetFormProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction={"column"} gap={2}>
          <Typography variant="h6">Asset #{index + 1}</Typography>
          <Stack direction={"row"} gap={2}>
            <RHFTextField
              name={`assets.${index}.id`}
              label="Id"
              control={control}
            />
            <RHFTextField
              name={`assets.${index}.interestRate`}
              label="Interest Rate"
              control={control}
              textFieldProps={{ type: "number" }}
            />
          </Stack>
          {canRemove && (
            <Button
              variant="outlined"
              size="small"
              color="error"
              type="button"
              onClick={onRemove}
              startIcon={<DeleteIcon />}
            >
              Delete Asset
            </Button>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
