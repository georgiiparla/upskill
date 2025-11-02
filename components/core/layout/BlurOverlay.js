"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const BlurOverlay = () => {
    // createPortal renders the div as a direct child of <body>,
    // allowing it to cover the entire screen while keeping scroll enabled.
    return createPortal(
        <div
            className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300 pointer-events-none"
            aria-hidden="true"
        />,
        document.body
    );
};