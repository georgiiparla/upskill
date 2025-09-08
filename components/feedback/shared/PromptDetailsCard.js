import { Card } from "@/components/shared/Helper";
import { Tag } from "lucide-react";

export const PromptDetailsCard = ({ promptData }) => {
    return (
        <Card>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{promptData.topic}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Requested by <span className="font-medium">{promptData.requester_username}</span> on {new Date(promptData.created_at).toLocaleDateString()}
                    </p>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md border border-gray-200 dark:border-gray-700">
                    <span className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Description:
                    </span>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {promptData.details}
                    </p>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{promptData.tag}</span>
                </div>
            </div>
        </Card>
    );
};