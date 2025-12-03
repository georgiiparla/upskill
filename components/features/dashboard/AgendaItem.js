// components/features/dashboard/AgendaItem.js
"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';
import { clientFetch } from '@/lib/client-api';
import { useAuth } from '@/context/AuthContext';
import { BlurOverlay } from '../../core/layout/BlurOverlay';

// Import sub-components
import { AgendaItemView } from './AgendaItemView';
import { AgendaItemEditor } from './AgendaItemEditor';

export const AgendaItem = ({ item, onUpdate, isEditing, setEditingItemId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { refreshNavbarPoints } = useAuth();
    const isSystemMantra = item.is_system_mantra;

    const handleSave = async (newTitle, newIcon, newLink) => {
        const hasTitleChanged = newTitle.trim() !== item.title;
        const hasIconChanged = newIcon !== item.icon_name;
        const hasLinkChanged = newLink.trim() !== (item.link || '');

        if (!hasTitleChanged && !hasIconChanged && !hasLinkChanged) {
            setEditingItemId(null);
            return;
        }

        setIsLoading(true);
        const payload = {
            title: newTitle.trim(),
            icon_name: newIcon,
            link: newLink.trim()
        };

        const response = await clientFetch(`/agenda_items/${item.id}`, {
            method: 'PATCH',
            body: payload
        });
        setIsLoading(false);

        if (response.success) {
            onUpdate(response.data);
            setEditingItemId(null);
            toast.success("Focus item updated!");
            refreshNavbarPoints();
        } else {
            toast.error(`Error: ${response.error}`);
        }
    };

    const handleCancel = () => {
        setEditingItemId(null);
    };

    return (
        <>
            {isEditing && <BlurOverlay />}

            <div className={`group relative transition-all duration-300 h-full ${isEditing ? 'z-50 scale-[1.02]' : ''}`}>
                {isEditing ? (
                    <AgendaItemEditor
                        item={item}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                ) : (
                    <AgendaItemView
                        item={item}
                        onEditClick={() => setEditingItemId(item.id)}
                        isSystemMantra={isSystemMantra}
                    />
                )}
            </div>
        </>
    );
};