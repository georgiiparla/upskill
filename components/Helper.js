const STYLES = {
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
        bg-white dark:bg-gray-800
        rounded-xl 
        shadow-md hover:shadow-lg
        overflow-hidden
        transition-all duration-300
    `
}

export const SectionTitle = ({ icon, title }) => (
	<div className={STYLES.sectionTitleContainer}>
		{icon}
		<h2 className={STYLES.sectionTitleHeader2}>{title}</h2>
	</div>
);

export const Card = ({ children, className = '' }) => (
	<div className={`${STYLES.cardContainer} ${className}`}>
		<div className="p-6">{children}</div>
	</div>
);
