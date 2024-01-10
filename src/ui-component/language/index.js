import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Language = () => {
    let active_lang = localStorage.getItem('language') || 'en';
    const { t, i18n } = useTranslation();

    const changeLanguage = (event) => {
        const language = event.target.value;

        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    };

    return (
        <Select value={active_lang} sx={{ border: 'none', marginRight: 2 }} onChange={changeLanguage}>
            <MenuItem value="am">🇪🇹 {t('Am')}</MenuItem>
            <MenuItem value="en">🇺🇸 {t('En')}</MenuItem>
        </Select>
    );
};

export default Language;
