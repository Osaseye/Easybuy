import React from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
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

      {/* Left Side - Image & Info - Fixed */}
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
            <h2 className="text-3xl font-bold leading-tight">Welcome Back to <br/>EasyBuy.</h2>
            <p className="text-blue-100 text-sm leading-relaxed opacity-90">
              Log in to manage your listings, view saved properties, and continue your journey to finding the perfect home.
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
              <p className="text-gray-500 dark:text-gray-400">Enter your details to access your account.</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-4">
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
                  <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                      <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline dark:text-blue-400">Forgot password?</Link>
                  </div>
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
                  <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="font-medium text-gray-500 dark:text-gray-400">Remember me</label>
                </div>
              </div>

              <button type="submit" className="w-full text-white bg-primary hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors shadow-lg shadow-blue-500/30">
                Log In
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
                Don't have an account? <Link to="/register" className="font-medium text-primary hover:underline dark:text-blue-400">Create one here</Link>
              </p>
            </form>
          </div>
        </div>
    </div>
  );
};
