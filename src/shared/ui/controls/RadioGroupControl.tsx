import styled from '@emotion/styled';

import { spacing, theme } from '~/shared/theme';
import { type Option } from '~/shared/types/option';
import { Typography } from '~/shared/ui/Typography';

type RadioGroupControlProps = {
  name: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
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

const Radio = styled.input({
  width: '16px',
  height: '16px',
  accentColor: theme.color.primary,
  cursor: 'inherit',
});

export const RadioGroupControl = ({
  name,
  value,
  options,
  onChange,
  isDisabled = false,
}: RadioGroupControlProps) => {
  return (
    <>
      {options.map((option) => (
        <OptionLabel key={option.value}>
          <Radio
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={isDisabled}
            onChange={() => onChange(option.value)}
          />
          <Typography variant="caption" as="span">
            {option.label}
          </Typography>
        </OptionLabel>
      ))}
    </>
  );
};
