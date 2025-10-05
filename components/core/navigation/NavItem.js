"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NavItem = ({ 
  href, 
  children, 
  isActive: isActiveProp,
  className = '',
  onClick,
  as = 'link',
  scrolled = false,
  isDropdown = false,
  ...props 
}) => {
  const pathname = usePathname();
  const isActive = isActiveProp !== undefined ? isActiveProp : pathname === href;
  
  const baseClasses = "relative text-sm font-normal font-mono tracking-tight transition-colors duration-300 group";
  const colorClasses = isActive 
    ? 'text-gray-900 dark:text-gray-100' 
    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300';
  
  const content = (
    <>
      {children}
      {scrolled && isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 bg-csway-green rounded-full"></span>
      )}
      <span 
        className={`absolute left-1/2 -bottom-0.5 h-[2px] bg-csway-green transition-all duration-300 transform -translate-x-1/2 ${
          isActive && !scrolled 
            ? isDropdown ? 'w-4/5' : 'w-3/5' 
            : `w-0 group-hover:${isDropdown ? 'w-4/5' : 'w-3/5'}`
        }`}
      />
    </>
  );

  if (as === 'button') {
    return (
      <button
        className={`${baseClasses} ${colorClasses} ${className}`}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <Link 
      href={href} 
      className={`${baseClasses} ${colorClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {content}
    </Link>
  );
};
