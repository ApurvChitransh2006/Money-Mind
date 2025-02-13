import Nav from '../components/PageEssentials/Nav.jsx';
import Footer from '../components/PageEssentials/Footer.jsx';
import image from '../assets/myimage.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const About = () => {

    useEffect(() => {
        const textAnimationAdder = () => {
            let textElement = document.getElementById('text-aboutus');
            if (!textElement) return;

            let text = 'The Money Mind was founded on this simple premise - Money buys you freedom';
            let char = text.split('');
            let newText = char.map(ch => `<span class='chars-text'>${ch}</span>`).join('');
            textElement.innerHTML = newText;
        };

        textAnimationAdder();

        // ✅ Run GSAP after ensuring text is updated
        gsap.from('.chars-text', {
            opacity: 0,
            y: 200,
            stagger: 0.03
        });

    }, []); // Ensure this only runs once

    useGSAP(() => {
        const tl11 = gsap.timeline({
            scrollTrigger: {
                trigger: '#text-aboutus',
                end: 'top -50%',
                start: 'top 50%',
                scrub: 3,
            }
        });

        tl11.from('#image', {
            scale: 0,
            scrub: 2
        })
    })

    return (
        <>
            <Nav />
            <div className='container mx-auto text-white px-4 md:px-0'>
                <div id='welcome-text' className='text-4xl md:text-6xl mt-5'>Welcome</div>
                <div id='text-aboutus' className='font-mono text-xl md:text-2xl my-8'>
                    The Money Mind was founded on this simple premise - Money buys you freedom
                </div>
                <div className='text-md md:text-lg'>
                    <span>Money Mind was created with one goal in mind—to make budgeting simple, intuitive, and stress-free. We believe financial clarity leads to freedom, and managing your money should feel empowering, not overwhelming. Too often, people struggle with confusing spreadsheets or complicated apps. Our app is designed to eliminate this frustration by helping you track expenses, set goals, and take control of your financial future with ease. We provide a user-friendly experience and actionable insights to help you confidently handle your finances.</span>
                    <br /><br />
                    <span>The idea for Money Mind was born in 2024 when our founder, Apurv, realized how difficult it was to track money using traditional methods. Like many, he struggled with budgeting, unclear spending, and financial uncertainty. Determined to create a better solution, he built a tool focused on simplicity and financial awareness. Money Mind replaces outdated systems, offering a seamless experience tailored to your needs. It makes planning, saving, and informed financial decisions easier than ever.</span>
                </div>
                <div id='image-text' className='w-full h-auto my-10 grid place-content-center'>
                    <img id='image' src={image} alt="About Us" />
                </div>
                <div id='welcome-text' className='text-md md:text-lg'>
                    <span>With Money Mind, you can create personalized budgets, monitor your spending in real time, and receive smart insights that help you save more effectively. Whether you're working toward financial independence, paying off debt, or just becoming more mindful of your expenses, we provide the tools to succeed. The app doesn't just track numbers—it helps you understand your spending habits and develop better financial practices. Automation, reminders, and easy dashboards make budgeting stress-free.</span>
                    <br /><br />
                    <span>Our mission is to empower you with financial confidence. Everyone deserves the chance to achieve financial stability, no matter their background. Money Mind is not just an app; it's a mindset shift encouraging intentional financial decisions. We’re here to support you every step of the way, making budgeting effortless, insightful, and even enjoyable.</span>
                </div>
                <div className='text-xl md:text-2xl mt-5'>Keep Saving,</div>
                <div className='text-2xl md:text-3xl'>Apurv & The Money Mind team</div>
            </div>
            <Swiper
                pagination={{ dynamicBullets: true }}
                navigation={true}
                modules={[Navigation, Pagination, Autoplay]}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 1500,  // ✅ Slide every 2.5 seconds
                    disableOnInteraction: false,  // ✅ Keeps autoplay working after user interacts
                }}
                className="mySwiper w-5/6 my-14">
                <SwiperSlide ><img src="https://images.unsplash.com/photo-1738258644135-29aa538dfa6f?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /></SwiperSlide>
                <SwiperSlide ><img src="https://plus.unsplash.com/premium_photo-1738614647383-0435fcb26a55?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></SwiperSlide>
                <SwiperSlide ><img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></SwiperSlide>
                <SwiperSlide ><img src="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></SwiperSlide>
                <SwiperSlide ><img src="https://images.unsplash.com/photo-1608592077365-c6399182e63c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></SwiperSlide>
            </Swiper>
            <Footer />
        </>
    );
};

export default About;
