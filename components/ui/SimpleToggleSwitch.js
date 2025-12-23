"use client";

const SimpleToggleSwitch = ({ options, activeOption, setActiveOption, className }) => {
    return (
        <div className={`flex space-x-1 md:space-x-1 rounded-lg bg-slate-100/10 dark:bg-slate-800/10 p-1 md:p-1 border border-slate-200 dark:border-slate-700 backdrop-blur-sm ${className}`}>
            {options.map(option => (
                <button
                    type="button"
                    key={option.id}
                    onClick={() => setActiveOption(option.id)}
                    className={`w-full rounded-md py-1.5 md:py-1.5 text-sm transition-colors duration-200
                        ${activeOption === option.id
                            ? 'bg-transparent text-slate-800 dark:text-slate-100'
                            : 'bg-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white'
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