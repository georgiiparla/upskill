import { useMemo } from 'react';
import { BASE_COLORS, ICON_MAP } from '../agenda-shared';

export const ANIMATION_CONFIG = {
    hoverDelay: 0.1,
    resetDelay: 0,
    scaleSpring: {
        type: "spring",
        stiffness: 400,
        damping: 25
    },
    mascotSpring: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        mass: 1
    },
    frameTransition: {
        duration: 0.3,
        ease: "easeOut"
    }
};

export const useAgendaItemStyles = (item, isSystemMantra) => {
    const iconKey = item.icon_name || 'ClipboardList';
    const colorKey = isSystemMantra ? 'Star' : (ICON_MAP[iconKey]?.colorKey || 'ClipboardList');
    const baseColor = BASE_COLORS[colorKey];

    const MascotIcon = ICON_MAP[iconKey]?.component || ICON_MAP['ClipboardList'].component;

    return {
        baseColor,
        MascotIcon
    };
};
