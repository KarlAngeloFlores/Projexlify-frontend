import React, { useState } from 'react'
import NavHeader from '../components/NavHeader'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm';
import VerificationForm from '../components/auth/VerificationForm';
import authService from '../services/auth';

const AuthPage = () => {

    const [currentAuth, setCurrentAuth] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [code, setCode] = useState('');

    const handleVerification = async (code) => {
        try {
          const result = await authService.registerAndVerify(token, password, code);
          console.log(result);
        } catch (error) {
          throw error;
        }
    }

  return (
    <div className='dark:bg-gray-950 bg-gray-100  text-white bg-gray-9'>
        <NavHeader />
        <section className='h-screen'>
            {currentAuth === 'login' && <LoginForm setCurrentAuth={setCurrentAuth} /> }
            {currentAuth === 'register' && <RegisterForm setCurrentAuth={setCurrentAuth} setEmail={setEmail} setPassword={setPassword} setToken={setToken}/>}
            {currentAuth === 'verification' && <VerificationForm type={'verify_account'} handleVerification={handleVerification} email={email} />}
        </section>
    </div>
  )
}

export default AuthPage