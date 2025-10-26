import { Stack } from "@mui/material";
import { CreateAssetsForm } from "../features/assets/ui/create-assets/components/CreateAssetsForm";

export const CreateAssetsPage = () => {
  return (
    <Stack direction={"column"} alignItems={"center"} margin={"auto"}>
      <CreateAssetsForm />
    </Stack>
  );
};
