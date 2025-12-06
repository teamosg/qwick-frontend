import logo from '@/assets/logo.svg'
import logoWhite from '@/assets/logo_white.svg'
import { Link } from 'react-router';
import { useTheme } from '../shared/ThemeProvider';

const Logo = () => {
    const { theme } = useTheme();

    return (
        <Link to="/" className="flex items-center gap-2 md:gap-2.5">
            {
                theme === 'light'
                    ? <img src={logo} alt="logo" className="w-[100px]" />
                    : <img src={logoWhite} alt="logo" className="w-[100px]" />
            }
        </Link>
    );
};

export default Logo;