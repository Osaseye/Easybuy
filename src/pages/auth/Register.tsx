import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, registration API call would go here.
    if (role === 'buyer') {
      navigate('/onboarding/buyer');
    } else if (role === 'landlord') {
      navigate('/onboarding/landlord');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-100 transition-colors duration-200">
        
        {/* Left Side - Image & Info */}
        <div className="hidden md:flex md:w-5/12 bg-primary relative overflow-hidden flex-col justify-between p-12 text-white">
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
            <h2 className="text-3xl font-bold leading-tight">Find Your Perfect <br/>Nigerian Home.</h2>
            <p className="text-blue-100 text-sm leading-relaxed opacity-90">
              Join thousands of verified homeowners and tenants. Smart recommendations tailored to your needs, built on trust.
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

        {/* Right Side - Form - Scrollable */}
        <div className="relative z-10 w-full md:w-7/12 h-full overflow-y-auto scrollbar-hide p-4 md:p-12 lg:p-16 flex flex-col justify-center items-center md:items-stretch bg-transparent md:bg-white md:dark:bg-surface-dark">
            <div className="md:hidden flex justify-center mb-8">
               <img alt="EasyBuy Logo" className="h-12 w-auto bg-white rounded-xl p-1" src="/icon.png" />
            </div>

          <div className="max-w-md mx-auto w-full bg-white dark:bg-surface-dark md:bg-transparent md:dark:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none shadow-2xl md:shadow-none">
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Create an Account</h1>
              <p className="text-gray-500 dark:text-gray-400">Choose your role to get started with EasyBuy.</p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="role" 
                    value="buyer" 
                    className="sr-only peer"
                    checked={role === 'buyer'}
                    onChange={() => setRole('buyer')}
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all h-full flex flex-col items-center text-center relative bg-white dark:bg-gray-800 ${role === 'buyer' ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'}`}>
                    <span className="material-symbols-outlined text-3xl text-primary mb-2">home</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Buyer / Tenant</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">I want to find a home</p>
                    {role === 'buyer' && (
                        <div className="absolute top-2 right-2 text-primary">
                             <span className="material-symbols-outlined text-xl">check_circle</span>
                        </div>
                    )}
                  </div>
                </label>
                
                <label className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="role" 
                    value="landlord" 
                    className="sr-only peer"
                    checked={role === 'landlord'}
                    onChange={() => setRole('landlord')}
                  />
                  <div className={`p-4 rounded-xl border-2 transition-all h-full flex flex-col items-center text-center relative bg-white dark:bg-gray-800 ${role === 'landlord' ? 'border-secondary bg-green-50/50 dark:bg-green-900/10' : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'}`}>
                    <span className="material-symbols-outlined text-3xl text-secondary mb-2">apartment</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Landlord</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">I want to list property</p>
                    {role === 'landlord' && (
                        <div className="absolute top-2 right-2 text-primary">
                             <span className="material-symbols-outlined text-xl">check_circle</span>
                        </div>
                    )}
                  </div>
                </label>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="fullname">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-gray-400 text-lg">person</span>
                    </div>
                    <input className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary block p-2.5 sm:text-sm" id="fullname" name="fullname" placeholder="e.g. Adebayo Ogunlesi" required type="text"/>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <span className="material-symbols-outlined text-gray-400 text-lg">email</span>
                    </div>
                    <input className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary block p-2.5 sm:text-sm" id="email" name="email" placeholder="name@example.com" required type="email"/>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                       <span className="material-symbols-outlined text-gray-400 text-lg">lock</span>
                    </div>
                    <input className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-primary focus:border-primary block p-2.5 sm:text-sm" id="password" name="password" placeholder="••••••••" required type="password"/>
                    <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" type="button">
                       <span className="material-symbols-outlined text-lg">visibility_off</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" required type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-500 dark:text-gray-400">I agree to the <a href="#" className="text-primary hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-primary hover:underline dark:text-blue-400">Privacy Policy</a></label>
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors shadow-lg shadow-blue-500/30">
                Create Account
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-surface-dark text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5" alt="Google" />
                  Google
                </button>
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                   <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5 w-5" alt="Facebook" />
                   Facebook
                </button>
              </div>

              <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400 mt-4">
                Already have an account? <Link to="/login" className="font-medium text-primary hover:underline dark:text-blue-400">Log in here</Link>
              </p>
            </form>
          </div>
        </div>
    </div>
  );
};
