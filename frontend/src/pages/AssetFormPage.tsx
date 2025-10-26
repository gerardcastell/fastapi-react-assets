import { Stack } from "@mui/material";
import { CreateAssetsForm } from "../features/assets/ui/create-assets/CreateAssetsForm";

export const AssetFormPage = () => {
  return (
    <Stack direction={"column"} alignItems={"center"} margin={"auto"}>
      <CreateAssetsForm />
    </Stack>
  );
};
