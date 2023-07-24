import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/Input';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/profiles');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
        console.log(error);
    }
  }, [email, name, password, login]);

  return (
 <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-gradient-to-br from-slate-50 to-zinc-300 w-full h-full lg:bg-opacity-50">
      <div className="h-screen flex items-center justify-center">
      <nav className="px-12 py-5"> 
      <img src="/images/logoBlack.png" alt="logo" className="h-12" />
                </nav>
                <div className="bg-gradient-to-br from-gray-300 to-zinc-300 bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-sm text-black mb-8 opacity-70 uppercase ">
            
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4 text-sm ">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={password}
                onChange={(e: any) => setPassword(e.target.value)} 
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className="text-sm bg-zinc-800 py-3 text-white rounded-md w-full mt-10 hover:bg-zinc-900 transition uppercase">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white bg-opacity-40 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white bg-opacity-40 rounded-full flex items-center justify-center cursor-pointer hover:bg-opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-center text-sm text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Aquarius?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-gray-50 ml-1 hover:underline cursor-pointer font-bold">
                {variant === 'login' ? 'Create an Account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
   </div>
  );
}

export default Auth;
