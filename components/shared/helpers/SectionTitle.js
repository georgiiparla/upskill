import React from 'react';

export const SectionTitle = ({ icon, title, subtitle, className = '' }) => (
  <div className={`text-center ${className}`}>
    <div className="inline-block bg-csway-orange/10 p-3 rounded-full mb-3">
      {icon}
    </div>
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
    <p className="text-md text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
  </div>
);
