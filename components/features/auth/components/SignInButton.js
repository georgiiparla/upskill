"use client";
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { GoogleIcon } from './GoogleIcon';

export const SignInButton = ({ handleLogin, isRedirecting }) => {
    return (
        <motion.a
            href="#"
            onClick={handleLogin}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`
                w-full relative z-20 inline-flex items-center justify-center px-4 py-2 font-medium text-gray-700 dark:text-gray-200 
                rounded-lg hover:bg-slate-50/80 dark:hover:bg-slate-700/30 focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-csway-green/50 transition-all duration-200 bg-transparent
                border border-transparent hover:border-slate-200 dark:hover:border-slate-700
                ${isRedirecting ? 'opacity-75 cursor-wait scale-95' : ''}
            `}
        >
            {isRedirecting ? (
                <Loader2 className="w-5 h-5 mr-3 animate-spin text-csway-green" />
            ) : (
                <GoogleIcon />
            )}
            {isRedirecting ? 'Connecting...' : 'Sign in'}
        </motion.a>
    );
};
