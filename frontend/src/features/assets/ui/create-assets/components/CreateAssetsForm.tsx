import AddIcon from "@mui/icons-material/Add";
import { Button, Stack, Typography } from "@mui/material";
import { useCreateAssetsForm } from "../hooks/useCreateAssetsForm";
import { AssetForm } from "./AssetForm";

export const CreateAssetsForm = () => {
  const {
    handleSubmit,
    control,
    fields,
    remove,
    handleSubmitForm,
    handleAddAsset,
  } = useCreateAssetsForm();

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
