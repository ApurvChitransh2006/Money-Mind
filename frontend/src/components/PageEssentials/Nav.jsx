import  { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SiWebmoney } from 'react-icons/si';
import { TiThMenuOutline } from 'react-icons/ti';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const menuRef = useRef(null);
    const tl1 = useRef(null);
    const tl2 = useRef(null);

    useGSAP(() => {
        tl1.current = gsap.timeline()
            .from('nav', {
                y: -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
            });

        tl2.current = gsap.timeline({ paused: true })
            .to(menuRef.current, {
                right: '0vw',
                duration: 1,
                ease: 'Power4.easeOut'
            })
            .from('.nav-links a', {
                opacity: 0,
                x: 50,
                duration: 0.5,
                stagger: 0.3,
            });
    }, []);

    const linkBig = (e) => {
        gsap.to(e.target, {
            scale: 1.3,
            duration: 0.2,
            padding: '5px 10px',
            boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            color: '#fff',
            ease: 'power1.out',
        });
    };

    const linkNormal = (e) => {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.2,
            padding: '0px 5px',
            boxShadow: '0 0 0px rgba(0, 0, 0, 0)',
            ease: 'power1.out',
        });
    };

    return (
        <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-5 py-3 bg-[#111] z-50">
            <div className="flex items-center gap-2">
                <SiWebmoney className="text-white text-4xl sm:text-5xl" />
                <span className="text-white text-2xl sm:text-3xl cursor-pointer" onClick={() => navigate('/')}>Money Mind</span>
            </div>
            <div>
                <TiThMenuOutline className="text-white text-3xl cursor-pointer" onClick={() => { tl2.current.play(); }} />
            </div>

            {/* Responsive Menu */}
            <div
                ref={menuRef}
                className="nav-menu fixed h-[100vh] w-[100vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] bg-white/20 backdrop-blur-md rounded-s-lg shadow-lg border border-white/30 top-0 right-[-100vw] flex items-center justify-center md:justify-start transition-all z-50"
            >
                <div className="flex flex-col gap-5 p-5 nav-links">
                    <Link onMouseEnter={linkBig} onMouseLeave={linkNormal} onClick={() => { tl2.current.timeScale(3).reverse(); }} to={`/`} className="text-white text-xl sm:text-2xl">
                        Home
                    </Link>
                    {['About', 'Contact', 'Sign-In', 'Sign-Up'].map((text, index) => (
                        <Link key={index} onMouseEnter={linkBig} onMouseLeave={linkNormal} onClick={() => { tl2.current.timeScale(3).reverse(); }} to={`/${text.toLowerCase().replace('-', '')}`} className="text-white text-xl sm:text-2xl">
                            {text}
                        </Link>
                    ))}
                </div>
                <IoClose
                    className="text-white absolute text-3xl sm:text-4xl top-5 right-5 cursor-pointer"
                    onClick={() => { tl2.current.timeScale(2).reverse(); }}
                />
            </div>
        </nav>
    );
};

export default Nav;