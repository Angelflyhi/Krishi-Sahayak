import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel id="language-label">Language</InputLabel>
      <Select
        labelId="language-label"
        value={language}
        label="Language"
        onChange={(event) => setLanguage(event.target.value)}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="hi">हिंदी</MenuItem>
        <MenuItem value="mr">मराठी</MenuItem>
      </Select>
    </FormControl>
  );
}
