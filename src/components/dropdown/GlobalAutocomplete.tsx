import { Autocomplete, TextField } from "@mui/material";

interface GlobalAutocompleteProps<T> {
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  label: string;
}

const GlobalAutocomplete = <T,>({
  options,
  value,
  onChange,
  getOptionLabel,
  label,
}: GlobalAutocompleteProps<T>) => {
  return (
    <Autocomplete
      sx={{ minWidth: 260 }}
      size="small"
      options={options}
      getOptionLabel={getOptionLabel}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
      fullWidth
    />
  );
};

export default GlobalAutocomplete;
