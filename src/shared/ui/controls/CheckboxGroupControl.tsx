import styled from '@emotion/styled';

import { spacing, theme } from '~/shared/theme';
import { type Option } from '~/shared/types/option';
import { Typography } from '~/shared/ui/Typography';

type CheckboxGroupControlProps = {
  name: string;
  value: string[];
  options: Option[];
  onChange: (value: string[]) => void;
  isDisabled?: boolean;
};

const OptionLabel = styled.label({
  display: 'inline-flex',
  alignItems: 'center',
  gap: spacing(2),
  cursor: 'pointer',

  '&:has(input:disabled)': {
    cursor: 'not-allowed',
    opacity: 0.6,
  },
});

const Checkbox = styled.input({
  width: '16px',
  height: '16px',
  accentColor: theme.color.primary,
  cursor: 'inherit',
});

const toggleValue = (value: string[], option: string) => {
  if (value.includes(option)) {
    return value.filter((item) => item !== option);
  }

  return [...value, option];
};

export const CheckboxGroupControl = ({
  name,
  value,
  options,
  onChange,
  isDisabled = false,
}: CheckboxGroupControlProps) => {
  return (
    <>
      {options.map((option) => (
        <OptionLabel key={option.value}>
          <Checkbox
            type="checkbox"
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            disabled={isDisabled}
            onChange={() => onChange(toggleValue(value, option.value))}
          />
          <Typography variant="caption" as="span">
            {option.label}
          </Typography>
        </OptionLabel>
      ))}
    </>
  );
};
