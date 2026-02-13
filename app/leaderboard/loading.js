import { HeroHeaderSkeleton } from "@/components/ui/loading/Skeletons";

const ItemSkeleton = ({ children, heightClass = 'py-4' }) => (
    <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 px-4 ${heightClass}`}>
        {children}
    </div>
);

const DESKTOP_ROWS = [
    { heightClass: 'py-10', rank: 'w-8 h-6', avatar: 'w-16 h-16', name: 'w-36 h-6', points: 'w-16 h-8' },
    { heightClass: 'py-9', rank: 'w-6 h-5', avatar: 'w-14 h-14', name: 'w-32 h-5', points: 'w-14 h-7' },
    { heightClass: 'py-8', rank: 'w-6 h-5', avatar: 'w-12 h-12', name: 'w-28 h-5', points: 'w-12 h-6' },
    { heightClass: 'py-6', rank: 'w-5 h-4', avatar: 'w-10 h-10', name: 'w-28 h-4', points: 'w-12 h-5' },
    { heightClass: 'py-5', rank: 'w-5 h-4', avatar: 'w-10 h-10', name: 'w-24 h-4', points: 'w-10 h-5' },
];

const MOBILE_ROWS = [
    { heightClass: 'py-10', rank: 'w-6 h-5', avatar: 'w-10 h-10', name: 'w-28 h-5', points: 'w-14 h-5' },
    { heightClass: 'py-9', rank: 'w-5 h-4', avatar: 'w-10 h-10', name: 'w-24 h-4', points: 'w-12 h-5' },
    { heightClass: 'py-8', rank: 'w-5 h-4', avatar: 'w-10 h-10', name: 'w-24 h-4', points: 'w-12 h-5' },
    { heightClass: 'py-6', rank: 'w-4 h-3', avatar: 'w-8 h-8', name: 'w-20 h-4', points: 'w-10 h-4' },
    { heightClass: 'py-5', rank: 'w-4 h-3', avatar: 'w-8 h-8', name: 'w-20 h-4', points: 'w-10 h-4' },
];

const LeaderboardSkeleton = () => (
    <div className="animate-pulse">
        <div className="hidden lg:block space-y-4">
            {DESKTOP_ROWS.map((row, i) => (
                <ItemSkeleton key={i} heightClass={row.heightClass}>
                    <div className="flex items-center">
                        <div className="w-16 flex justify-center flex-shrink-0">
                            <div className={`${row.rank} bg-slate-200 dark:bg-slate-700 rounded`}></div>
                        </div>

                        <div className="flex items-center gap-4 w-72 flex-shrink-0">
                            <div className={`${row.avatar} bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0`}></div>
                            <div className={`${row.name} bg-slate-200 dark:bg-slate-700 rounded`}></div>
                        </div>

                        <div className="flex-1 px-6">
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                        </div>

                        <div className="w-32 text-right flex-shrink-0 flex justify-end">
                            <div className={`${row.points} bg-slate-200 dark:bg-slate-700 rounded`}></div>
                        </div>
                    </div>
                </ItemSkeleton>
            ))}
        </div>

        <div className="lg:hidden space-y-3">
            {MOBILE_ROWS.map((row, i) => (
                <ItemSkeleton key={i} heightClass={row.heightClass}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`${row.rank} bg-slate-200 dark:bg-slate-700 rounded`}></div>
                            <div className={`${row.avatar} bg-slate-200 dark:bg-slate-700 rounded-full flex-shrink-0`}></div>
                            <div className={`${row.name} bg-slate-200 dark:bg-slate-700 rounded`}></div>
                        </div>

                        <div className="text-right">
                            <div className={`${row.points} bg-slate-200 dark:bg-slate-700 rounded ml-auto`}></div>
                        </div>
                    </div>

                    <div className="mt-3 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                </ItemSkeleton>
            ))}
        </div>
    </div>
);

export default function LeaderboardLoading() {
    return (
        <div className="mx-auto w-full space-y-8">
            <HeroHeaderSkeleton />
            <LeaderboardSkeleton />
        </div>
    );
}