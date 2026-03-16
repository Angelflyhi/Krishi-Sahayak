import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();

  return (
    <AppBar position="sticky" color="success">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {t.appTitle}
        </Typography>
        <Box>
          <LanguageSwitcher />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
