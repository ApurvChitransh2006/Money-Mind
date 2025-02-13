import  { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SiWebmoney } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../../api/axiosInstance.js";

const Nav = ({ init }) => {
    const Navigate = useNavigate()
    const menuRef = useRef(null);
    const tl1 = useRef(null); // Store the timeline in ref
    const tl2 = useRef(null);

    useGSAP(() => {
        tl1.current = gsap.timeline()
        tl1.current.from('nav', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        })

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
            boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.8)', // Glow effect
            borderRadius: '10px',
            color: '#fff', // Ensure the text color contrasts with the glow
            ease: 'power1.out',
        })
    };
    const linkNormal = (e) => {
        gsap.to(e.target, {
            scale: 1,
            duration: 0.2,
            padding: '0px 5px',
            boxShadow: '0 0 0px rgba(0, 0, 0, 0)', // Remove glow
            ease: 'power1.out',
        });
    };

    const logout = ()=>{
        try {
            const logoutexe = axiosInstance.post('/auth/logout')
        }catch(err){
            console.log(err);
        }
    }

    return (
        <nav className="flex justify-between items-center px-5 py-3 fixed w-full top-0 right-0 bg-[#111] z-50">
            <div className="flex items-center gap-2">
                <SiWebmoney className="text-white text-4xl sm:text-5xl" />
                <span className="text-white text-2xl sm:text-3xl cursor-pointer" onClick={() => { Navigate('/') }}>Money Mind</span>
            </div>
            <div className='rounded-full border-2 px-2' onClick={() => { tl2.current.play() }}>
                <div className="text-white text-3xl cursor-pointer uppercase" >{init}</div>
            </div>

            {/* Responsive Menu */}
            <div
                ref={menuRef}
                className="nav-menu fixed h-[100vh] w-[100vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] bg-white/20 backdrop-blur-md rounded-s-lg shadow-lg border border-white/30 top-0 right-[-100vw] flex items-center justify-center md:justify-start transition-all z-50"
            >
                <div className="flex flex-col gap-5 p-5 nav-links">
                    <Link onMouseEnter={(e) => { linkBig(e) }} onMouseLeave={(e) => { linkNormal(e) }} onClick={() => { tl2.current.timeScale(3).reverse() }} to="/profile" className="text-white text-xl sm:text-2xl">Profile</Link>
                    <Link onMouseEnter={(e) => { linkBig(e) }} onMouseLeave={(e) => { linkNormal(e) }} onClick={() => { tl2.current.timeScale(3).reverse() }} to="/dashboard" className="text-white text-xl sm:text-2xl">Dashboard</Link>
                    <Link onMouseEnter={(e) => { linkBig(e) }} onMouseLeave={(e) => { linkNormal(e) }} onClick={() => { tl2.current.timeScale(3).reverse(); logout() }} to="/" className="text-white text-xl sm:text-2xl">Log Out</Link>
                </div>
                <div className='rounded-full border-2 px-2 absolute text-3xl sm:text-4xl top-5 right-5 cursor-pointer' onClick={() => { tl2.current.timeScale(2).reverse() }}>
                    <div className="text-white text-3xl cursor-pointer uppercase" >{init}</div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
