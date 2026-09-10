import styled from '@emotion/styled';

import { createControlStyle } from './controlStyles';

export type TextControlType = 'text' | 'number' | 'date' | 'email' | 'password';

type TextControlProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: TextControlType;
  placeholder?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
  autoComplete?: string;
  describedBy?: string;
};

const Input = styled.input<{ $isInvalid: boolean }>(({ $isInvalid }) =>
  createControlStyle($isInvalid),
);

export const TextControl = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  type = 'text',
  placeholder,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
  autoComplete,
  describedBy,
}: TextControlProps) => {
  return (
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      readOnly={isReadOnly}
      autoComplete={autoComplete}
      aria-invalid={isInvalid}
      aria-describedby={describedBy}
      $isInvalid={isInvalid}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
    />
  );
};
