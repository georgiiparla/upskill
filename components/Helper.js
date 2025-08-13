export const SectionTitle = ({ icon, title }) => (
	<div className="flex items-center mb-4">
		{icon}
		<h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-3">{title}</h2>
	</div>
);

export const Card = ({ children, className = '' }) => (
	<div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
		<div className="p-6">{children}</div>
	</div>
);
