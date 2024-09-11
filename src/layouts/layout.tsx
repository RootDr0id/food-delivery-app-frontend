import React from 'react'
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

type Props={
children: React.ReactNode;
showHero?:boolean;
};
/**
 * Layout component
 *
 * Layout component for the entire application, which consists of a header, optional hero section, main content, and footer.
 *
 * @param children - The main content of the application
 * @param showHero - Whether or not to show the hero section. Defaults to false.
 *
 * @returns A JSX element representing the layout of the application.
 */
const Layout=({children,showHero=false} : Props)=>{
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {showHero && <Hero />}
            <div className='container mx-auto flex-1 py-10'>
                {children}
            </div>
            <Footer />
        </div>
    )
};

export default Layout
