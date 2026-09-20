import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ThemeNavbar from './ThemeNavbar'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsMenuOpen(false); // Close when scrolled down
            } else {
                setIsMenuOpen(true); // Open when at the top
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Left / Main Navigation Navbar */}
            <nav
                aria-label="Main Navigation"
                className={`fixed top-5 z-50 mt-7 left-4 sm:left-10 lg:left-16 h-[64px] rounded-xl bg-app-glass border border-app-main flex items-center p-1.5 shadow-sm dark:shadow-2xl backdrop-blur-md transition-all duration-500 overflow-hidden ${
                    isMenuOpen ? 'w-[610px]' : 'w-[200px]'
                }`}
            >
                <div className='flex items-center h-full px-4 shrink-0'>
                    <Link to="#hero" onClick={(e) => scrollToSection(e, 'hero')}>
                        <h1 className='text-[32px] sm:text-[34px] font-extrabold text-app-primary hover:text-app-accent transition-colors tracking-tight'>
                            Gaurav <span className='text-[#137cbd]'>.</span>
                        </h1>
                    </Link>
                </div>

                {isMenuOpen && (
                    <div className='h-full rounded-md flex mx-6 items-center gap-8 justify-between flex-1 max-w-[260px]'>
                        <div className='h-full flex-1 flex items-center justify-center'>
                            <Link to="#skills" onClick={(e) => scrollToSection(e, 'skills')} className='text-[16px] font-medium text-app-secondary leading-[20px] tracking-normal hover:text-app-accent transition-colors'>Skills</Link>
                        </div>
                        <div className='h-full flex-1 flex items-center justify-center'>
                            <Link to="#experience" onClick={(e) => scrollToSection(e, 'experience')} className='text-app-secondary text-[16px] leading-[20px] font-medium tracking-normal hover:text-app-accent transition-colors'>Experience</Link>
                        </div>
                        <div className='h-full flex-1 flex items-center justify-center'>
                            <Link to="#projects" onClick={(e) => scrollToSection(e, 'projects')} className='text-app-secondary text-[16px] leading-[20px] font-medium tracking-normal hover:text-app-accent transition-colors'>Projects</Link>
                        </div>
                        <div className='h-full flex-1 flex items-center justify-center'>
                            <Link to="#certificates" onClick={(e) => scrollToSection(e, 'certificates')} className='text-app-secondary text-[16px] leading-[20px] font-medium tracking-normal hover:text-app-accent transition-colors'>Certificates</Link>
                        </div>
                    </div>
                )}

                {/* Menu collapse toggle */}
                <div
                    className='h-full flex items-center justify-end px-4 ml-auto hover:cursor-pointer'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    title={isMenuOpen ? 'Collapse Menu' : 'Expand Menu'}
                >
                    <span className='text-app-accent font-bold text-[18px] hover:text-app-primary transition-colors select-none'>
                        :
                    </span>
                </div>
            </nav>

            {/* Right Dedicated Theme Navbar */}
            <ThemeNavbar />
        </>
    )
}

export { ThemeNavbar }
export default Navbar