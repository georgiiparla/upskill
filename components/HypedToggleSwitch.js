import { motion } from 'framer-motion';

const HypedToggleSwitch = ({ options, activeOption, setActiveOption }) => {
    return (
        <div className="flex space-x-1 rounded-full bg-slate-200 dark:bg-slate-700 p-1">
            {options.map(option => (
                <button
                    key={option.id}
                    onClick={() => setActiveOption(option.id)}
                    className={`relative w-24 rounded-full py-1.5 text-sm font-semibold transition-colors
                        ${activeOption === option.id 
                            ? 'text-white' 
                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
                        }`}
                >
                    {/* The "magic" happens here with the animated pill */}
                    {activeOption === option.id && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 bg-csway-green rounded-full shadow-md"
                            style={{ borderRadius: 9999 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{option.label}</span>
                </button>
            ))}
        </div>
    );
};

export default HypedToggleSwitch;