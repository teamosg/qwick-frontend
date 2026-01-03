import logoDefault from '@/assets/logo.svg'
import logoWhite from '@/assets/logo_white.svg'
import { useTheme } from '../shared/ThemeProvider';
import { useGetWebsiteSettings } from '@/hooks/settings.hook';

const MEDIA_BASE_URL = "https://darrenchua.softvencealpha.com";

const LogoOnly = () => {
    const { theme } = useTheme();
    const { data: settings } = useGetWebsiteSettings();

    const logoSrc = settings?.logo
        ? (settings.logo.startsWith('http') ? settings.logo : `${MEDIA_BASE_URL}${settings.logo}`)
        : (theme === 'light' ? logoDefault : logoWhite);

    return (
        <div className="flex items-center gap-2 md:gap-2.5">
            <img
                src={logoSrc}
                alt={settings?.site_name || "logo"}
                className="h-10 md:h-12 w-auto object-contain"
            />
        </div>
    );
};

export default LogoOnly;
