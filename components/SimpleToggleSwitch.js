"use client";

const SimpleToggleSwitch = ({ options, activeOption, setActiveOption, className }) => {
    return (
        <div className={`flex space-x-1 rounded-lg bg-gray-200 dark:bg-slate-700 p-1 ${className}`}>
            {options.map(option => (
                <button
                    key={option.id}
                    onClick={() => setActiveOption(option.id)}
                    className={`w-full rounded-md py-1.5 text-sm font-semibold transition-colors duration-200
                        ${activeOption === option.id
                            ? 'bg-white text-slate-800 shadow-sm dark:bg-slate-900/70 dark:text-slate-100'
                            : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
                        }`
                    }
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default SimpleToggleSwitch;