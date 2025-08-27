"use client";

import { X } from 'lucide-react';


export const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
    
    if (!isOpen) {
        return null;
    }
    

    return (
        // Backdrop
        
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose} // Close modal on backdrop click
        >
            

            
            <div
                className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
            

                <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                    

                    
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    
                </div>


                
                <div className="py-6 text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {children}
                </div>
                


                <div className="flex justify-end space-x-4">

                    
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:outline-none"
                    >
                        Cancel
                    </button>
                    

                    
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
                    >
                        Sign Out
                    </button>
                    


                </div>
                
            </div>
        </div>
    );
};