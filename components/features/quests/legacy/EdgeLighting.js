import React from 'react';
import { motion } from 'framer-motion';

// Edge Lighting Component
const EdgeLighting = ({ isActive, isNewProgress, isIOS }) => {
    if (!isActive) return null;
    if (isIOS) return null;

    const defaultGradient = `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 200deg, #94a3b8 300deg, #64748b 340deg, transparent 360deg)`;
    const successGradient = `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 200deg, #34d399 300deg, #10b981 340deg, transparent 360deg)`;
    const gradientColors = isNewProgress ? successGradient : defaultGradient;

    return (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-xl pointer-events-none">
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    padding: '2px',
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    WebkitMaskComposite: 'xor',
                }}
            >
                <motion.div
                    className="absolute inset-[-100%] top-[-100%]"
                    style={{ background: gradientColors }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="absolute inset-[-100%] top-[-100%] blur-lg"
                    style={{ background: gradientColors, opacity: 0.6 }}
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />
            </div>
        </div>
    );
};

export default EdgeLighting;
