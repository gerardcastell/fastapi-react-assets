import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { AssetForm } from "./AssetForm";
import { assetsFormSchema, type AssetsFormSchemaType } from "./schemas";
import AddIcon from "@mui/icons-material/Add";

export const CreateAssetsForm = () => {
  const { handleSubmit, control } = useForm<AssetsFormSchemaType>({
    resolver: zodResolver(assetsFormSchema),
    defaultValues: {
      assets: [{ id: "", interestRate: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
  });

  const handleSubmitForm = (data: AssetsFormSchemaType) => {
    console.log(data);
  };

  const handleAddAsset = () => {
    append({ id: "", interestRate: "" });
  };

  return (
    <Stack
      component="form"
      direction={"column"}
      gap={3}
      sx={{
        width: "100%",
      }}
      onSubmit={handleSubmit(handleSubmitForm)}
    >
      <Typography variant="h4">Create Assets</Typography>

      {fields.map((field, index) => (
        <AssetForm
          key={field.id}
          control={control}
          index={index}
          onRemove={() => remove(index)}
          canRemove={fields.length > 1}
        />
      ))}

      <Button
        variant="outlined"
        size="medium"
        color="primary"
        type="button"
        onClick={handleAddAsset}
        startIcon={<AddIcon />}
      >
        Add New Asset
      </Button>

      <Button sx={{ mt: 1 }} variant="contained" color="primary" type="submit">
        Create Assets
      </Button>
    </Stack>
  );
};
