import { type SxProps, TextField } from "@mui/material";
import { type ComponentProps } from "react";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface RHFTextFieldProps<TField extends FieldValues> {
  name: Path<TField>;
  control: Control<TField>;
  label: string;
  textFieldProps?: ComponentProps<typeof TextField>;
}

export const RHFTextField = <TField extends FieldValues>(
  props: RHFTextFieldProps<TField> & SxProps,
) => {
  const { name, control, label, textFieldProps, ...sx } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const { ref, value, onChange } = field;
        return (
          <TextField
            size="small"
            {...textFieldProps}
            {...field}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "white",
              },
              ...(value && !error
                ? {
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "success.main",
                        borderWidth: 2,
                      },
                    },
                  }
                : {}),
              ...sx,
            }}
            value={value ?? ""}
            id={name}
            data-cy={`text-field-${name}`}
            onChange={(e) => {
              onChange(e);
            }}
            label={label}
            error={Boolean(error)}
            variant="outlined"
            fullWidth
            helperText={error?.message}
            inputRef={ref}
          />
        );
      }}
    />
  );
};
