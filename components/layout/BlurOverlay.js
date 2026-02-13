"use client";

import { createPortal } from 'react-dom';

export const BlurOverlay = () => {
    return createPortal(
        <div
            className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 pointer-events-none"
            aria-hidden="true"
        />,
        document.body
    );
};