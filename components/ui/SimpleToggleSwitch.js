"use client";

const SimpleToggleSwitch = ({ options, activeOption, setActiveOption, className }) => {
    return (
        <div className={`flex space-x-1 rounded-xl bg-slate-100 dark:bg-slate-900/50 p-1.5 border border-slate-200 dark:border-slate-800 backdrop-blur-sm ${className}`}>
            {options.map(option => (
                <button
                    type="button"
                    key={option.id}
                    onClick={() => setActiveOption(option.id)}
                    className={`flex-1 w-full rounded-lg py-3 text-lg font-medium transition-all duration-200
                        ${activeOption === option.id
                            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm'
                            : 'bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
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