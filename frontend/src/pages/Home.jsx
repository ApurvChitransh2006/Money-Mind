import { Link } from 'react-router-dom';
import video from '../assets/BrandingVideo.mp4';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MdAttachMoney } from "react-icons/md";
import { SiCoinmarketcap } from "react-icons/si";
import { FaTools } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import Nav from '../components/PageEssentials/Nav.jsx';
import Footer from '../components/PageEssentials/Footer.jsx';
import image from '../assets/moneyworks.jpg'
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance'
import Successpop from '../components/Popups/Successpop.jsx';
import ErrorPop from '../components/Popups/Errorpop.jsx';
gsap.registerPlugin(ScrollTrigger)

const Home = () => {

    useGSAP(() => {
        const tl3 = gsap.timeline();

        tl3.from('.content h1, .content div', {
            opacity: 0,
            x: 200,
            duration: 0.4,
            stagger: 0.5
        });

        tl3.to('video', {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: -0.5,
            boxShadow: "0 0 35px rgba(255, 255, 255, 0.7)",
        });

        const tl4 = gsap.timeline({
            scrollTrigger: {
                trigger: '.box2',
                end: 'top 30%',
                start: 'top 50%',
                scrub: 3,
            }
        });

        tl4.from('.box2-innner', {
            opacity: 0,
            x: 200,
            stagger: 0.3,
        });

        const tl5 = gsap.timeline({
            scrollTrigger: {
                trigger: '.newsetter',
                end: 'top 10%',
                start: 'top 40%',
                scrub: 3,
            }
        });

        tl5.from('.email-image', {
            opacity: 0,
            scale: 0,
            delay: 4
        })

        tl5.from('.animate-text', {
            opacity: 0,
            x: 200,
            stagger: 0.5
        })
    }, []);

    const Scaler = (e, origin) => {
        gsap.to(e, {
            scale: 1.3,
            duration: 0.3,
            transformOrigin: origin || 'center'
        });
    };

    const Descaler = (e) => {
        gsap.to(e, {
            scale: 1,
            duration: 0.3
        });
    };

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isChecked, setisChecked] = useState(false)
    const [fullname, setFullname] = useState("")
    const [email, setemail] = useState("")

    const saveNewsletter = async () => {
        try {
            const response = await axiosInstance.post("subs/", {
                username: fullname,
                email: email,
            });
            console.log("Response Data:", response.data);
            // Show success message and auto-hide it
            setError(null);
            setSuccess("You have Successfully Logged in.");

            setTimeout(() => {
                setSuccess(null); // Reset success message
                Navigate('/profile'); // Change to your actual route
            }, 3000);
        } catch (error) {
            console.error("Error posting data:", error);
            setError("Invalid email or password");

            setTimeout(() => {
                setError(null); // Reset error message
            }, 5000);
        }
        setFullname("")
        setemail("")
    }

    return (
        <>
            <Nav />
            <div className='container mx-auto grid grid-cols-12 text-white h-[90vh] '>
                <div className='col-span-12 md:col-span-6 my-auto video-home'>
                    <video
                        src={video}
                        autoPlay
                        muted
                        loop
                        className="w-11/12 h-auto rounded-lg mx-auto scale-0 opacity-0"
                    ></video>
                </div>
                <div className='content col-span-12 px-5 md:text-start md:col-span-6 flex flex-col justify-start md:justify-center items-center md:items-start'>
                    <h1 id='heading-main' className='text-3xl md:text-4xl font-bold text-white' onMouseEnter={() => { Scaler('#heading-main', 'bottom left') }} onMouseLeave={() => { Descaler('#heading-main', 'bottom left') }}>Money Mind</h1>
                    <div className='text-xl md:text-2xl mt-2 text-center md:text-start'>
                        Place where you don't need to mind about money.<br />
                        <span className='text-xl md:text-3xl'>Join Us today to feel the Freedom.</span>
                    </div>
                    <div>
                        <Link to="/signup" className='inline-block md:px-0 mt-7 px-4 py-2 rounded-lg border-2 w-32 text-center border-white hover:scale-125 hover:bg-white hover:text-black hover:border-black active:scale-90'>
                            <span>Get Started</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='container mx-auto grid grid-cols-12 text-white md:h-[40vh] gap-5 box2'>
                <div id='box-1' className='col-span-12 md:col-span-3 flex flex-col justify-center items-center text-center px-3 box2-innner' onMouseEnter={() => { Scaler('#box-1') }} onMouseLeave={(e) => { Descaler('#box-1') }}>
                    <div className='rounded-full border-2 flex justify-center items-center'><MdAttachMoney className='text-5xl' /></div>
                    <div className='text-3xl'>Learn Money Basics</div>
                    <div className='text-lg'>Master budgeting, saving, and spending smart.</div>
                </div>
                <div id='box-2' className='col-span-12 md:col-span-3 flex flex-col justify-center items-center text-center px-3 box2-innner' onMouseEnter={() => { Scaler('#box-2') }} onMouseLeave={(e) => { Descaler('#box-2') }}>
                    <div className='rounded-full flex justify-center items-center'><SiCoinmarketcap className='text-5xl' /></div>
                    <div className='text-3xl'>Smart Investing</div>
                    <div className='text-lg'>Get tips on stocks, crypto, and more.</div>
                </div>
                <div id='box-3' className='col-span-12 md:col-span-3 flex flex-col justify-center items-center text-center px-3 box2-innner' onMouseEnter={() => { Scaler('#box-3') }} onMouseLeave={(e) => { Descaler('#box-3') }}>
                    <div className='rounded-full flex justify-center items-center'><FaTools className='text-5xl' /></div>
                    <div className='text-3xl'> Tools & Calculators</div>
                    <div className='text-lg'>Use our tools to track and grow your money.</div>
                </div>
                <div id='box-4' className='col-span-12 md:col-span-3 flex flex-col justify-center items-center text-center px-3 box2-innner' onMouseEnter={() => { Scaler('#box-4') }} onMouseLeave={(e) => { Descaler('#box-4') }}>
                    <div className='rounded-full flex justify-center items-center'><RiUserCommunityFill className='text-5xl' /></div>
                    <div className='text-3xl'>Join the Community</div>
                    <div className='text-lg'>Connect with others and share financial tips.</div>
                </div>
            </div>
            <div className='newsetter container mx-auto grid grid-cols-12 mt-20 bg-purple-800 rounded-2xl py-10 md:px-10 gap-5 md:gap-0 ' >
                <div className='col-span-12 md:col-span-8 flex flex-col justify-center items-center md:items-start text-white gap-7 px-10'>
                    <div className='animate-text text-3xl md:text-5xl font-bold '>Get our latest news, tips & views</div>
                    <div className='animate-text text-md md:text-xl my-2'>Sign up to access our investment insights, including our quarterly newsletter, monthly factsheet and other Company news.</div>
                    <input type="text" name="fullName" className='animate-text w-full md:w-5/6 text-2xl px-4 py-2 rounded-lg text-black' value={fullname} onChange={(e) => { setFullname(e.target.value) }} placeholder='*Full Name...' />
                    <input type="text" name="emailAddress" className='animate-text w-full md:w-5/6 text-2xl px-4 py-2 rounded-lg text-black' placeholder='*Email Address...' value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <div><input type="checkbox" name="privacyCheck" onClick={() => setisChecked((prev) => !prev)} /> <span className='animate-text text-md md:text-xl'>I agree to Alliance Witan storing my information for the purpose of receiving marketing communications in line with its privacy policy.</span></div>
                    <button className='bg-white animate-text  text-purple-800 px-5 py-2 rounded-lg text-2xl font-bold' disabled={!isChecked} onClick={saveNewsletter}>Submit</button>
                </div>
                <div className='col-span-12 md:col-span-4 grid place-content-center email-image'><img src={image} />
                </div>
                {/* Show Error or Success Popup */}
                {error && <ErrorPop msg="There was an error, Please subscribe again!." />}
                {success && <Successpop msg="We are excited to have you as the part of our community." />}
            </div>
            <Footer />
        </>
    );
}

export default Home;
