import React, { useState } from 'react';
import { darklogo } from '../assets/index';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { motion } from "framer-motion"; 
import { Link, useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const Registration = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    const [clientName, setClientName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");

    // Error Message start
    const [errClientName, setErrClientName] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errCPassword, setErrCPassword] = useState("");
    const [firebaseErr, setFirebaseErr] = useState("");
    // Loading State Start
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");

    // Handle Function start
    const handleName = (e) => {
        setClientName(e.target.value);
        setErrClientName("");
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    }

    const handleCPassword = (e) => {
        setCPassword(e.target.value);
        setErrCPassword("");
    }

    // Email Validation
    const emailValidation = (email) => {
        return String(email)
            .toLowerCase()
            .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
    }

    // Submit button Start
    const handleRegistration = (e) => {
        e.preventDefault();
        if(!clientName) {
            setErrClientName("Enter your name");
        }
        if(!email) {
            setErrEmail("Enter your email");
            setFirebaseErr("")
        }else {
            if(!emailValidation(email)) {
            setErrEmail("Enter a valid email");
            }
        }
        if(!password) {
            setErrPassword("Enter your password");
        }else{
            if(password.length < 6) {
                setErrPassword("Password must be at least 6 characters")
            }
        }
        if(!cPassword) {
            setErrCPassword("Re-enter your password");
        }else if(cPassword !== password) {
            setErrCPassword("Password not matched")
        }

        if(clientName && email && emailValidation(email) && password && password.length >= 6 && cPassword && cPassword === password) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
             .then((userCredential) => {
                updateProfile(auth.currentUser, {
                    displayName: clientName,
                    photoURL: 'https://scontent-los2-1.cdninstagram.com/v/t51.2885-19/279626172_546902803629270_3533420399382330529_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-los2-1.cdninstagram.com&_nc_cat=106&_nc_ohc=jmXjx8mOW6AAX_sT7ju&edm=ABmJApABAAAA&ccb=7-5&oh=00_AfCGB19btooGME4owmYExzHYUmW1HXaZvjTirFIjd0bGig&oe=64F4DC40&_nc_sid=b41fef',

                })
                // Signed in
                const user = userCredential.user;
                setLoading(false);
                setSuccessMsg("Account Created Successfully!!!");
                setTimeout(() => {
                    navigate("/signin")
                }, 3000)
                // ...
             })
             .catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes("auth/email-already-in-use")) {
                    setFirebaseErr("Email already in use, Try another one");
                }
             });

            // ======== Firebase Registration ends here ==========
            setClientName("");
            setEmail("");
            setPassword("");
            setCPassword("");
            setFirebaseErr("");
        }
    };

  return (
    <div className='w-full'>
      <div className='w-full bg-gray-100 pb-10'>
        <form className='w-[370px] mx-auto flex flex-col items-center'>
            <img className='w-32' src={darklogo} alt='darkLogo' />
            <div className='w-full border bordr-zinc-200 p-6'>
                <h2 className='font-titleFont text-3xl font-medium mb-4'>
                    Create Account
                </h2>
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                    <p className='text-sm font-medium'>
                        Your Name
                    </p>
                    <input 
                        onChange={handleName}
                        value={clientName}
                        className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                        type='text' 
                    />
                    {
                        errClientName && (
                            <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                <span className='italic font-titleFont font-extrabold text-base'>
                                    !!!
                                </span> 
                                {errClientName}
                            </p>
                        )
                    }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Email or Mobile phone number</p>
                        <input 
                            onChange={handleEmail}
                            value={email} 
                            className='w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                            type='email' 
                        />
                        {
                            errEmail && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>
                                        !!!
                                    </span> 
                                    {errEmail}
                                </p>
                            )
                        }
                        {
                            firebaseErr && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>
                                        !!!
                                    </span> 
                                    {firebaseErr}
                                </p>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Password</p>
                        <input 
                            onChange={handlePassword}
                            value={password} 
                            className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' 
                            type='password' 
                        />
                        {
                            errPassword && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>
                                        !!!
                                    </span> 
                                    {errPassword}
                                </p>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-sm font-medium'>Re-enter password</p>
                        <input 
                            onChange={handleCPassword}
                            value={cPassword} 
                            className='w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100' type='password' 
                        />
                        {
                            errCPassword && (
                                <p className='text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5'>
                                    <span className='italic font-titleFont font-extrabold text-base'>
                                        !!!
                                    </span> 
                                    {errCPassword}
                                </p>
                            )
                        }
                        <p className='text-xs text-gray-600'>Passwords must be at least 6 characters.</p>
                    </div>
                    <button 
                        onClick={handleRegistration} 
                        className='w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput'>
                            Continue
                    </button>
                    {
                        loading && (
                            <div className='flex justify-center items-center'>
                                <RotatingLines
                                    strokeColor='#febd69'
                                    strokeWidth='5'
                                    animationDuration='0.75'
                                    width='50'
                                    visible={true}
                                />
                            </div>
                        )
                    }
                    {
                        successMsg && (
                            <div>
                                <motion.p 
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5}}
                                    className='text-base font-titleFont font-semibold text-green-500 border-[1px] border-green-500 px-2 text-center'
                                >
                                    {successMsg}
                                </motion.p>
                            </div>
                        )
                    }
                </div>
                <p className='text-xs text-black leading-4 mt-4'>By creating an account, you agree to Amazon's <span className='text-blue-600'>Conditions of Use</span> and <span className='text-blue-600'>Privacy Notice</span></p>
                <div className='text-xs text-black leading-4 mt-4'>
                    <p className='text-xs text-black'>
                        Already have an account?{" "}
                        <Link to="/signin">
                            <span className='text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>
                                Sign in 
                                <span><ArrowRightIcon /></span>
                            </span>
                        </Link>
                    </p>
                    <p className='text-xs text-black -mt-2'>
                        Buying for work?
                        {" "}
                        <span className='text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>
                            Create a free business account 
                            <span><ArrowRightIcon /></span>
                        </span>
                    </p>
                </div>
            </div>
        </form>
      </div>
      <div className='w-full bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center py-10'>
        <div className='flex items-center gap-6'>
          <p className='text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>
            Conditions of Use
          </p>
          <p className='text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>
            Privacy Notice
          </p>
          <p className='text-blue-600 hover:text-orange-700 hover:underline underline-offset-1 cursor-pointer duration-100'>
            Contact Us
          </p>
        </div>
        <p className='text-xs text-gray-600'>
          © 1998-2023, Vicetee Cole, Inc. or its affiliates
        </p>
      </div>
    </div>
  )
}

export default Registration
