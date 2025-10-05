// Animation variants for leaderboard components

// Fade up animation - items appear from bottom with fade
export const leaderboardContainerVariantsFadeUp = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

export const leaderboardItemVariantsFadeUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "tween",
            duration: 0.4,
            ease: "easeOut",
        },
    },
};

// Ladder animation variant - items appear from left to right
export const leaderboardContainerVariantsLadder = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.06,
        },
    },
};

export const leaderboardItemVariantsLadder = {
    hidden: { x: -100, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 180,
            damping: 18,
        },
    },
};
