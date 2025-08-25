import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import type { Control, FieldValues } from "react-hook-form";


interface Props<T extends FieldValues = any> {
  control: Control<T>;
}

const TextFieldsGroup: React.FC<Props> = ({ control }) => (
  <>
    <Controller name="firstName" control={control}
      render={({ field, fieldState }) => (
        <TextField label="First Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
      )}
    />
    <Controller name="lastName" control={control}
      render={({ field, fieldState }) => (
        <TextField label="Last Name" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
      )}
    />
    <Controller name="idNumber" control={control}
      render={({ field, fieldState }) => (
        <TextField label="ID Number" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
      )}
    />
    <Controller name="dob" control={control}
      render={({ field, fieldState }) => (
        <TextField label="Date of Birth" {...field} error={!!fieldState.error} helperText={fieldState.error?.message} />
      )}
    />
  </>
);

export default TextFieldsGroup;
