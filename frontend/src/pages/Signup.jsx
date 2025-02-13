import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SiWebmoney } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useState } from 'react';
import Successpop from '../components/Popups/Successpop.jsx';
import ErrorPop from '../components/Popups/Errorpop.jsx';

const Signup = () => {
    useGSAP(() => {
        gsap.from('.image-animate', {
            opacity: 0,
            x: 200,
            duration: 1,
            transformOrigin: 'right'
        })
        const tlrtl = gsap.timeline()
        tlrtl.from('.animate-rtl', {
            opacity: 0,
            x: -200,
            stagger: 0.08
        })
    })

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")

    const Navigate = useNavigate()

    const saveForm = async () => {
        try {
            const response = await axiosInstance.post("user/", {
                username: username,
                email: email,
                password: password,
                isAdmin: false
            });
            console.log("Response Data:", response.data);
            setError(null);
            setSuccess("You have Successfully Logged in.");

            setTimeout(() => {
                setSuccess(null); // Reset success message
                Navigate('/signin'); // Change to your actual route
            }, 3000);

        } catch (error) {
            console.error("Error posting data:", error);
            setError("Invalid email or password");

            setTimeout(() => {
                setError(null); // Reset error message
            }, 5000);
        }
        setemail("")
        setusername("")
        setpassword("")
    }

    return (
        <>
            <div className='grid grid-cols-12 h-screen w-screen relative'>
                <div className='col-span-12 md:col-span-7 flex justify-center items-center relative'>
                    <Link to='/'>
                        <div className="absolute flex items-center gap-2 top-5 left-5">
                            <SiWebmoney className="text-white text-3xl md:text-4xl" />
                            <span className="text-white text-xl sm:text-2xl">Money Mind</span>
                        </div>
                    </Link>
                    <div className='px-12'>
                        <div className='text-white text-2xl md:text-4xl font-bold text-center md:text-start animate-rtl'>Create Your Account</div>
                        <div className='text-gray-500 text-sm my-2 text-center md:text-start animate-rtl'>Create a free account</div>
                        <input className='py-2 px-5 w-full rounded-2xl text-xl md:text-2xl bg-slate-800 text-white my-2 animate-rtl' type="text" name="fullName" placeholder='John Abraham' value={username} onChange={(e) => { setusername(e.target.value) }} />
                        <input className='py-2 px-5 w-full rounded-2xl text-xl md:text-2xl bg-slate-800 text-white my-2 animate-rtl' type="text" name="email" placeholder='johnabraham@gmail.com' value={email} onChange={(e) => { setemail(e.target.value) }} />
                        <input className='py-2 px-5 w-full rounded-2xl text-xl md:text-2xl bg-slate-800 text-white my-2 animate-rtl' type="password" name="password" placeholder='*******' value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        <button className=" animate-rtl active:scale-75 border-2 py-2 my-2 rounded-2xl w-full text-white hover:bg-white hover:scale-105 hover:text-black" onClick={saveForm}>
                            Sign Up
                        </button>
                        <div className='text-white text-sm mt-1 text-center md:text-start animate-rtl'>Already have an account? <span className='underline'><Link to='/signin'>Sign In</Link></span></div>
                    </div>
                </div>
                <div className='hidden md:block md:col-span-5 overflow-hidden image-animate'><img className='object-cover object-bottom h-full w-full' src="https://images.unsplash.com/photo-1473081556163-2a17de81fc97?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /></div>
                {/* Show Error or Success Popup */}
                {error && <ErrorPop msg="Please enter valid details. (name>3, email>13 and pass>8)" />}
                {success && <Successpop msg="We have Successfully Created an Account." />}
            </div>
        </>
    );
};

export default Signup;
