import React, { useState } from 'react'
import ForgotForm from '../components/auth/ForgotForm'
import EmailForm from '../components/auth/EmailForm'
import NavHeader from '../components/NavHeader'
import VerificationForm from '../components/auth/VerificationForm'
import authService from '../services/auth';

const ForgotPage = () => {

  const [currentAuth, setCurrentAuth] = useState('email');
  const [email, setEmail] = useState('');

  const handleEmail = async (email) => {
    try {
      setEmail(email);
      const data = await authService.forgotPassword(email);
      console.log(data);
      setCurrentAuth('verification');
    } catch (error) {
      throw error;
    }
  }

  const handleVerification = async (code) => {
    try {

      const result = await authService.verifyResetPassword(email, code);
      setCurrentAuth('change');

    } catch (error) {
      throw error;
    }
  };

  const handleForgotPassword = async (newPassword, confirmPassword) => {
    try {
      const result = await authService.confirmPassword(email, newPassword, confirmPassword);
      console.log(result);
    } catch (error) {
      throw error;
    }
  }

  

  return (
    <div className='bg-gray-950 text-white'>
        <NavHeader />

        {currentAuth === 'email' && <EmailForm handleEmail={handleEmail}/>}
        {currentAuth === 'verification' && <VerificationForm handleVerification={handleVerification} type={'change_password'} email={email}/>}
        {currentAuth === 'change' && <ForgotForm handleForgotPassword={handleForgotPassword} />}
        
    </div>
  )
}

export default ForgotPage