// import logoDefault from '@/assets/logo.svg'
// import logoWhite from '@/assets/logo_white.svg'
import logoRed from '@/assets/qwick_logo_black.svg'
import logoWhite from '@/assets/qwick_logo_white.svg'
import { Link } from 'react-router';
import { useTheme } from '../shared/ThemeProvider';
import { useGetWebsiteSettings } from '@/hooks/settings.hook';

const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

const Logo = () => {
    const { theme } = useTheme();
    const { data: settings } = useGetWebsiteSettings();

    // const logoSrc = settings?.logo
    //     ? (settings.logo.startsWith('http') ? settings.logo : `${MEDIA_BASE_URL}${settings.logo}`)
    //     : logoRed
    
    const logoSrc = (theme === 'light' ? logoRed : logoWhite);

    return (
        <Link to="/" className="flex items-center gap-2 md:gap-2.5">
            <img
                src={logoSrc}
                alt="logo"
                className="h-8 md:h-10 w-auto object-contain"
            />
        </Link>
    );
};

export default Logo;