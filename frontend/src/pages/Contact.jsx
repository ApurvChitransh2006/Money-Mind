import Nav from '../components/PageEssentials/Nav.jsx';
import Footer from '../components/PageEssentials/Footer.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Successpop from '../components/Popups/Successpop.jsx';
import ErrorPop from '../components/Popups/Errorpop.jsx';

const Contact = () => {
    useGSAP(() => {
        const tlright = gsap.timeline()
        tlright.from('.animate-right', {
            opacity: 0,
            x: 200,
            stagger: 0.08
        })
        const tlleft = gsap.timeline()
        tlleft.from('.animate-left', {
            opacity: 0,
            x: -200,
            stagger: 0.4
        })
    })

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isChecked, setisChecked] = useState(false)
    const [fname, setfname] = useState(null)
    const [lname, setlname] = useState(null)
    const [email, setemail] = useState(null)
    const [phone, setphone] = useState(null)
    const [msg, setmsg] = useState(null)

    const saveForm = async () => {
        try {
            const response = await axiosInstance.post("msg/", {
                firstName: fname,
                lastName: lname,
                email: email,
                phoneNum: phone,
                message: msg
            });
            console.log("Response Data:", response.data);
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
        setemail("")
        setfname("")
        setlname("")
        setmsg("")
        setphone("")
    }

    return (
        <>
            <Nav />
            <div className='container mx-auto grid grid-cols-12 text-white my-10 mt-20 relative'>
                <div className='col-span-12 md:col-span-4 px-3 hidden md:block'>
                    <div className='animate-left text-3xl mb-8'>Talk with our sales team</div>
                    <div className='animate-left'>Get in touch with our dedicated sales team for personalized assistance. Whether you have questions, need more information about our products or services, or are ready to get started, we're here to help. Reach out today, and we'll ensure you receive the support you need to make the best decision for your business.</div>
                </div>
                <div className="p-5 col-span-12 md:col-span-8 text-xl shadow-md shadow-white">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="animate-right col-span-12 md:col-span-4">First Name: *</div>
                        <div className="animate-right col-span-12 md:col-span-8">
                            <input
                                className="w-full p-3 rounded-lg text-white bg-slate-800 "
                                type="text"
                                name="firstName"
                                placeholder="John"
                                value={fname} onChange={(e) => { setfname(e.target.value) }}
                            />
                        </div>

                        <div className="animate-right col-span-12 md:col-span-4">Last Name: *</div>
                        <div className="animate-right col-span-12 md:col-span-8">
                            <input
                                className="w-full p-3 rounded-lg text-white bg-slate-800"
                                type="text"
                                name="lastName"
                                placeholder="Abraham"
                                value={lname} onChange={(e) => { setlname(e.target.value) }}
                            />
                        </div>

                        <div className="animate-right col-span-12 md:col-span-4">Email: *</div>
                        <div className="animate-right col-span-12 md:col-span-8">
                            <input
                                className="w-full p-3 rounded-lg text-white bg-slate-800"
                                type="text"
                                name="email"
                                placeholder="johnabraham@gmail.com"
                                value={email} onChange={(e) => { setemail(e.target.value) }}
                            />
                        </div>

                        <div className="animate-right col-span-12 md:col-span-4">Phone Number: *</div>
                        <div className="animate-right col-span-12 md:col-span-8">
                            <input
                                className="w-full p-3 rounded-lg text-white bg-slate-800"
                                type="text"
                                name="phoneNumber"
                                placeholder="7954543239"
                                value={phone} onChange={(e) => { setphone(e.target.value) }}
                            />
                        </div>

                        <div className="animate-right col-span-12 md:col-span-4">What would you like to discuss? *</div>
                        <div className="animate-right col-span-12 md:col-span-8">
                            <textarea
                                className="w-full p-2 rounded-lg text-white h-32 resize-none border border-gray-300 bg-slate-800 "
                                name="discussion"
                                rows="4"
                                placeholder="Type your message here..."
                                value={msg} onChange={(e) => { setmsg(e.target.value) }}
                            ></textarea>
                        </div>

                        <div className="animate-right col-span-12 md:col-span-4"></div>
                        <div className="animate-right col-span-12 md:col-span-8 text-lg ">
                            <input type="checkbox" name="privacyCheck" onClick={() => setisChecked((prev) => !prev)} /> By checking the box and
                            clicking 'Submit', you are agreeing to Money Mind Privacy Statement
                        </div>

                        <div className="animate-right col-span-12 md:col-span-4"></div>
                        <div className="animate-right col-span-12 md:col-span-8 grid md:block place-content-center">
                            <button className="active:scale-75 hello sigin-button border-2 px-6 py-1 rounded-md mt-4 hover:bg-white hover:scale-110 hover:text-black" disabled={!isChecked} onClick={saveForm}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                {/* Show Error or Success Popup */}
                {error && <ErrorPop msg="We didnt got your msg, Please Try Again!" />}
                {success && <Successpop msg="We got your msg, Will contact you soon!" />}
            </div>
            <Footer />
        </>
    )
}

export default Contact