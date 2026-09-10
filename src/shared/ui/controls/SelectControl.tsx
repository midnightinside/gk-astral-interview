import styled from '@emotion/styled';

import { type Option } from '~/shared/types/option';

import { createControlStyle } from './controlStyles';

type SelectControlProps = {
  id: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  describedBy?: string;
};

const Select = styled.select<{ $isInvalid: boolean }>(({ $isInvalid }) => ({
  ...createControlStyle($isInvalid),
  appearance: 'none',
  cursor: 'pointer',
}));

export const SelectControl = ({
  id,
  name,
  value,
  options,
  onChange,
  onBlur,
  placeholder = 'Не выбрано',
  isDisabled = false,
  isInvalid = false,
  describedBy,
}: SelectControlProps) => {
  return (
    <Select
      id={id}
      name={name}
      value={value}
      disabled={isDisabled}
      aria-invalid={isInvalid}
      aria-describedby={describedBy}
      $isInvalid={isInvalid}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};
