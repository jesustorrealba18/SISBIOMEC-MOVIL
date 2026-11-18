import React from 'react';
import { Controller } from 'react-hook-form';
import LabeledInput from './LabeledInput';

export default function CampoTexto({ control, name, rules, label, ...inputProps }) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <LabeledInput
          label={label}
          value={value ?? ''}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...inputProps}
        />
      )}
    />
  );
}
