import { motion } from 'framer-motion';

const HypedToggleSwitch = ({ options, activeOption, setActiveOption, className }) => {
    return (
        <div className={`flex space-x-1 rounded-lg dark:bg-slate-700 p-1 ${className}`}>
            {options.map(option => (
                <button
                    key={option.id}
                    onClick={() => setActiveOption(option.id)}
                    className={`relative w-full rounded-lg py-1.5 text-sm font-semibold transition-colors
                        ${activeOption === option.id
                            ? 'text-slate-800 dark:text-slate-100'
                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
                        }`}
                >
                    {activeOption === option.id && (
                        <motion.div
                            layoutId="active-pill"
                            className="absolute inset-[-4px] bg-transparent border-2 border-green-500 rounded-md"
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