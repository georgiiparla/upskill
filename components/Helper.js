const tailwind = {

    sectionTitleContainer: `
        flex
        items-center
        mb-4
    `,

    sectionTitleHeader2: `
        text-xl 
        font-bold 
        text-gray-800 dark:text-gray-200 
        ml-3
    `,

    cardContainer: `
        bg-white/50 dark:bg-gray-800/50
        backdrop-blur-lg
        rounded-xl 
        border border-white/20
        shadow-lg
        transition-all duration-300
    `

}

export const SectionTitle = ({ icon, title, className}) => (
    <div className={`${tailwind.sectionTitleContainer} ${className}`}>
        {icon}
        <h2 className={tailwind.sectionTitleHeader2}>{title}</h2>
    </div>
);

export const Card = ({ children, className = '' }) => (
    <div className={`${tailwind.cardContainer} ${className}`}>
        <div className="p-6">{children}</div>
    </div>
);
