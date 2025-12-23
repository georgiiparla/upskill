"use client";
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const LogoAndBrand = ({ scrolled }) => (
    <Link href="/dashboard" className={`flex-shrink-0 text-gray-900 dark:text-white font-bold text-xl flex items-center ${inter.className}`}>
        <Image src="/csway-logo.png" alt="CSway Logo" width={24} height={24} className="mr-2" />
        <span className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${scrolled ? 'w-0 opacity-0' : ''}`}>Upskill</span>
    </Link>
);
