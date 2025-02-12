import { ReactNode, useState } from 'react';
import styles from './app.module.css';
import overlayStyles from './overlay-style.module.css';

// Definizione interfacce
interface Page {
    path: string;
    title: string;
}

interface AppProps {
    children?: ReactNode;
}

interface SidebarProps {}
interface MainContentProps {
    children?: ReactNode;
}
interface HeaderProps {}
interface TableOfContentsProps {
    mode: 'large' | 'small';
}

// Mock components temporanei finché non vengono creati i veri componenti
const Sidebar = (props: SidebarProps) => <aside>Sidebar</aside>;
const MainContent = ({ children }: MainContentProps) => <main>{children}</main>;
const Header = (props: HeaderProps) => <header>Header</header>;
const TableOfContents = ({ mode }: TableOfContentsProps) => <nav>Table of Contents ({mode})</nav>;

// Mock delle pagine - da sostituire con i dati reali
const pages: Page[] = [
    { path: '/', title: 'Home' },
    { path: '/about', title: 'About' },
    // Aggiungi altre pagine come necessario
];

// Custom hook per la gestione dell'overlay
const useNavOverlay = () => {
    const [showNavOverlay, setShowNavOverlay] = useState(false);
    
    const openNav = () => setShowNavOverlay(true);
    const closeNav = () => setShowNavOverlay(false);
    
    return { showNavOverlay, openNav, closeNav };
};

export function App({ children }: AppProps) {
    const { showNavOverlay, closeNav } = useNavOverlay();

    return (
        <div className={styles.app_wrap} id="app_wrap">
            {showNavOverlay && (
                <div className={overlayStyles.overlay}>
                    <div>
                        <Header />
                        <ul>
                            {pages.map((page: Page) => (
                                <li key={page.path}>
                                    <a
                                        onClick={() => closeNav()}
                                        className={`sidebar-link ${`${process.env.BASE_URL}${page.path}` === location.pathname ? 'active' : ''}`}
                                        href={`${process.env.BASE_URL}${page.path}`}
                                    >
                                        {page.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <Header />
            <div className={styles.container}>
                <Sidebar />
                <MainContent>{children}</MainContent>
                <TableOfContents mode="large" />
            </div>
        </div>
    );
} 