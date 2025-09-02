const ActionButton = ({ icon, text, shortText, colorScheme = 'orange' }) => {
    const colorClasses = {
        orange: 'text-csway-orange focus:ring-csway-orange',
        blue: 'text-blue-500 dark:text-blue-400 focus:ring-blue-500',
    };

    const selectedColor = colorClasses[colorScheme] || colorClasses.orange;

    return (
        <button className={`
            flex items-center justify-center px-3 py-1.5 text-xs font-semibold
            bg-gray-200/50 hover:bg-gray-200
            dark:bg-gray-700/50 dark:hover:bg-gray-700
            rounded-md transition-colors focus:outline-none focus:ring-2
            focus:ring-offset-2 dark:focus:ring-offset-gray-800
            ${selectedColor}
        `}>
            {icon}
            {shortText ? (
                <>
                    <span className="hidden md:inline">{text}</span>
                    <span className="inline md:hidden">{shortText}</span>
                </>
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};

export {ActionButton};