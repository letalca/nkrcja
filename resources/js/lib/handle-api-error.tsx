import { toast } from '@/hooks/useToast';
import { handleServerError } from './utils';

// Create a dedicated error handling utility
export const handleApiError = (error: unknown, context: string) => {
    console.error(`${context}:`, error);
    if (typeof error === 'object' && error && 'message' in error) {
        return toast({
            title: 'Error',
            description: (
                <div>
                    <span className="text-white">Failed to {context}.</span>
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">
                            {JSON.stringify(error)}
                        </code>
                    </pre>
                </div>
            ),
            variant: 'destructive',
        });
    }
    handleServerError(error);
};
