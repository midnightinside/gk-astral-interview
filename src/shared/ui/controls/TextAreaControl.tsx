import styled from '@emotion/styled';

import { createControlStyle } from './controlStyles';

type TextAreaControlProps = {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  rows?: number;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isInvalid?: boolean;
};

const TextArea = styled.textarea<{ $isInvalid: boolean }>(({ $isInvalid }) => ({
  ...createControlStyle($isInvalid),
  minHeight: '96px',
  resize: 'vertical',
}));

export const TextAreaControl = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  isDisabled = false,
  isReadOnly = false,
  isInvalid = false,
}: TextAreaControlProps) => {
  return (
    <TextArea
      id={id}
      name={name}
      value={value}
      rows={rows}
      placeholder={placeholder}
      disabled={isDisabled}
      readOnly={isReadOnly}
      aria-invalid={isInvalid}
      $isInvalid={isInvalid}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
    />
  );
};
