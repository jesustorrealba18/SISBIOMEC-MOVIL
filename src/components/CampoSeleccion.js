import React from 'react';
import { Controller } from 'react-hook-form';
import LabeledSelect from './LabeledSelect';

export default function CampoSeleccion({ control, name, rules, label, options, placeholder }) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <LabeledSelect
          label={label}
          options={options}
          selectedValue={value ?? ''}
          onSelect={onChange}
          placeholder={placeholder}
          error={error?.message}
        />
      )}
    />
  );
}
