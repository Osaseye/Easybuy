import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      setIsSent(true);
      toast.success('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-[url('/hero-bg.jpg')] bg-cover bg-center md:bg-none text-gray-800 dark:text-gray-100 transition-colors duration-200 overflow-hidden relative">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
      
        {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-navy/90 md:hidden z-0"></div>
        
        {/* Left Side - Image & Info */}
        <div className="hidden md:flex md:w-5/12 bg-primary h-full relative overflow-hidden flex-col justify-between p-12 text-white">
          <div className="absolute inset-0 z-0">
             <img src="/hero-bg.jpg" alt="Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
             <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none z-0">
            <svg className="absolute right-0 bottom-0 h-full w-auto transform translate-x-1/3 translate-y-1/3 text-white fill-current" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 100 C 20 0 50 0 100 100 Z"></path>
            </svg>
          </div>

          <div className="z-10 flex items-center gap-3">
            <img alt="EasyBuy Logo" className="h-10 w-auto bg-white rounded-lg p-1" src="/icon.png" />
            <span className="text-2xl font-bold tracking-tight">EasyBuy</span>
          </div>

          <div className="z-10 space-y-6">
            <h2 className="text-3xl font-bold leading-tight">Secure Your <br/>Account.</h2>
            <p className="text-blue-100 text-sm leading-relaxed opacity-90">
              We value your security. Reset your password to regain access to your saved searches and property listings.
            </p>
            <div className="flex -space-x-2 pt-4">
               <img alt="User Avatar 1" className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-600 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" />
               <img alt="User Avatar 2" className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-600 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" />
               <img alt="User Avatar 3" className="inline-block h-10 w-10 rounded-full ring-2 ring-blue-600 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64" />
               <div className="h-10 w-10 rounded-full ring-2 ring-blue-600 bg-blue-800 flex items-center justify-center text-xs font-medium text-white">2k+</div>
            </div>
            <p className="text-xs text-blue-200">Trusted by over 2,000 users this month</p>
          </div>

          <div className="z-10 text-xs text-blue-200">
            © 2026 EasyBuy Realty.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="relative z-10 w-full md:w-7/12 h-full overflow-y-auto scrollbar-hide p-4 md:p-12 lg:p-16 flex flex-col justify-center items-center md:items-stretch bg-transparent md:bg-white md:dark:bg-surface-dark">
            <div className="md:hidden flex justify-center mb-8">
               <img alt="EasyBuy Logo" className="h-12 w-auto bg-white rounded-xl p-1" src="/icon.png" />
            </div>

          <div className="max-w-md mx-auto w-full bg-white dark:bg-surface-dark md:bg-transparent md:dark:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none shadow-2xl md:shadow-none">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot Password?</h1>
              <p className="text-gray-500 dark:text-gray-400">Enter your email and we'll send you a link to reset your password.</p>
            </div>

            {isSent ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-3xl text-green-600 dark:text-green-400">mark_email_read</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Check your email</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  We've sent a password reset link to your email address. Please check your inbox and spam folder.
                </p>
                <div className="pt-4">
                  <Link to="/login" className="w-full inline-block text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors shadow-lg shadow-blue-500/30">
                    Return to Login
                  </Link>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                         <span className="material-symbols-outlined text-gray-400 text-lg">email</span>
                      </div>
                      <input className={`pl-10 w-full rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary'} bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white block p-2.5 sm:text-sm`} id="email" placeholder="name@example.com" type="email" {...register('email')} />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <button type="submit" disabled={isLoading} className="w-full text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 mt-6">
                    <span className="material-symbols-outlined text-gray-400 text-sm">arrow_back</span>
                    <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                        Back to Login
                    </Link>
                </div>
              </form>
            )}
          </div>
        </div>
    </div>
  );
};
