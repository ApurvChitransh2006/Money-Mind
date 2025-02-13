import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SiWebmoney } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useState } from 'react';
import Successpop from '../components/Popups/Successpop.jsx';
import ErrorPop from '../components/Popups/Errorpop.jsx';

const Signin = () => {
    useGSAP(() => {
        gsap.from('.image-animate', {
            opacity: 0,
            x: 200,
            duration: 1,
            transformOrigin: 'right'
        });

        gsap.timeline().from('.animate-rtl', {
            opacity: 0,
            x: -200,
            stagger: 0.08
        });
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const Navigate = useNavigate();

    const saveForm = async () => {
        try {
            const response = await axiosInstance.post('auth/login', {
                email: email,
                password: password
            });

            console.log('Response Data:', response.data);
            localStorage.setItem('token', JSON.stringify(response.data.token));
            // Show success message and auto-hide it
            setError(null);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(null); // Reset success message
                Navigate('/dashboard'); // Change to your actual route
            }, 3000);
        } catch (error) {
            console.error('Error posting data:', error);
            setError("Invalid email or password");

            setTimeout(() => {
                setError(null); // Reset error message
            }, 5000);
        }

        setEmail('');
        setPassword('');
    };

    return (
        <>
            <div className='grid grid-cols-12 h-screen w-screen relative overflow-x-hidden'>
                <div className='col-span-12 md:col-span-7 flex justify-center items-center relative'>
                    <Link to='/'>
                        <div className="absolute flex items-center gap-2 top-5 left-5">
                            <SiWebmoney className="text-white text-3xl md:text-4xl" />
                            <span className="text-white text-xl sm:text-2xl">Money Mind</span>
                        </div>
                    </Link>
                    <div className='px-12'>
                        <div className='text-white text-2xl md:text-4xl font-bold text-center md:text-start animate-rtl '>Welcome Back</div>
                        <div className='text-gray-500 text-sm my-2 text-center md:text-start animate-rtl '>Sign in to your account</div>
                        <input className='animate-rtl py-2 px-5 w-full rounded-2xl text-xl md:text-2xl bg-slate-800 text-white my-2'
                            type="text" name="email" placeholder='johnabraham@gmail.com'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='animate-rtl py-2 px-5 w-full rounded-2xl text-xl md:text-2xl bg-slate-800 text-white my-2'
                            type="password" name="password" placeholder='*******'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="animate-rtl active:scale-75 border-2 py-2 my-2 rounded-2xl w-full text-white hover:bg-white hover:scale-105 hover:text-black"
                            onClick={saveForm}>
                            Sign In
                        </button>
                        <div className='text-white text-sm mt-1 text-center md:text-start animate-rtl '>Don't have an account? <span className='underline'><Link to='/signup'>Sign Up</Link></span></div>
                    </div>
                </div>

                {/* Show Error or Success Popup */}
                {error && <ErrorPop msg="Email or password is invalid." />}
                {success && <Successpop msg="You have Successfully Logged in." />}

                <div className='hidden md:block md:col-span-5 overflow-hidden image-animate'>
                    <img className='object-cover object-bottom h-full w-full'
                        src="https://images.unsplash.com/photo-1516410529446-2c777cb7366d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmslMjB0aGVtZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="" />
                </div>
            </div>
        </>
    );
};

export default Signin;
