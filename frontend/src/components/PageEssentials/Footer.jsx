import React from 'react'
import { SiWebmoney } from 'react-icons/si';
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
    useGSAP(() => {
        const tl10 = gsap.timeline({
            scrollTrigger: {
                trigger: '.start-footer',
                start: 'top 80%',
            }
        })

        tl10.from('.div-foooter', {
            opacity: 0,
            scale: 0
        })

    })

    const Scaler = (e) => {
        gsap.to(e, {
            scale: 1.3,
            duration: 0.3,
            transformOrigin: 'center'
        });
    };

    const Descaler = (e) => {
        gsap.to(e, {
            scale: 1,
            duration: 0.3
        });
    };

    return (
        <>
            <div className='start-footer container mx-auto h-[50vh] flex flex-col justify-center items-center text-white mt-10'>
                <div className="div-foooter flex items-center gap-2" >
                    <a href="/" className='link-div flex items-center' onMouseEnter={() => { Scaler('.link-div') }} onMouseLeave={() => { Descaler('.link-div') }}>
                        <SiWebmoney className="text-4xl sm:text-5xl" />
                        <span className="text-2xl sm:text-3xl">Money Mind</span>
                    </a>
                </div>
                <div className="div-foooter flex flex-col items-center gap-2 mt-3">
                    <div>190-A Gayatripuram, Gorakhpur GKP 273003</div>
                    <div>(+91) 7985268724</div>
                    <div><a href="https://mail.google.com/mail/u/0/?ogbl#inbox?compose=VpCqJVFFtbPjKnFznctpWZTnVLVNsVqcDzGtvvtwMQPJZxqfGSNGCpRTDRWGxNfzBvXKvwB" className='underline'>apurvchitransh.in@gmail.com</a></div>
                </div>
                <div className='div-foooter my-9 flex justify-center gap-5'>
                    <a href="https://www.instagram.com/_i.am.apurv_/" className='link-1 text-3xl' onMouseEnter={() => { Scaler('.link-1') }} onMouseLeave={() => { Descaler('.link-1') }}><FaInstagram /></a>
                    <a href="https://x.com/its_apurv_" className='link-2 text-3xl' onMouseEnter={() => { Scaler('.link-2') }} onMouseLeave={() => { Descaler('.link-2') }}><FaXTwitter /></a>
                    <a href="https://github.com/ApurvChitransh2006" className='link-3 text-3xl' onMouseEnter={() => { Scaler('.link-3') }} onMouseLeave={() => { Descaler('.link-3') }}><FaGithub /></a>
                </div>
                <div className='div-foooter mb-3'>Copyright 2024 Apurv Agency. All Rights Reserved.</div>
            </div>
        </>
    )
}

export default Footer