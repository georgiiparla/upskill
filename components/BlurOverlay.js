"use client";

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export const BlurOverlay = () => {
    // A nice side-effect: prevent the page from scrolling while editing.
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // createPortal renders the div as a direct child of <body>,
    // allowing it to cover the entire screen.
    return createPortal(
        <div
            className="fixed inset-0 z-40 bg-gray-900/20 backdrop-blur-sm transition-opacity duration-300"
            aria-hidden="true"
        />,
        document.body
    );
};