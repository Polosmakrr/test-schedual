import React from 'react';
import { TextField } from '@material-ui/core';
import { useField } from 'formik';
import { SPACES } from '../../../theme';

interface Props {
  name: string;
  label?: string;
  type: string;
}

export function InputComponent({ name, label, type, ...props }: Props) {
  const [field, meta] = useField(name);
  return (
    <TextField
      style={{ paddingBottom: SPACES.l, paddingLeft: SPACES.s, paddingRight: SPACES.s }}
      type={type}
      id={name}
      name={name}
      label={label}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      {...props}
    />
  );
}
