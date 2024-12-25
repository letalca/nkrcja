import { IconClipboard, IconClipboardCheck } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

interface CopyToClipboardProps {
    textToCopy: string;
    label?: string;
    copiedDuration?: number;
    onCopySuccess?: () => void;
    onCopyError?: (error: Error) => void;
}

const DEFAULT_COPIED_DURATION = 2000;

const CopyToClipboard = ({
    textToCopy,
    label,
    copiedDuration = DEFAULT_COPIED_DURATION,
    onCopySuccess,
    onCopyError,
}: CopyToClipboardProps) => {
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setError(null);
    }, [textToCopy]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (copied) {
                setCopied(false);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopied(true);
            setError(null);
            onCopySuccess?.();

            const timeoutId = setTimeout(() => {
                setCopied(false);
            }, copiedDuration);
            return () => clearTimeout(timeoutId);
        } catch (err) {
            const error =
                err instanceof Error
                    ? err
                    : new Error('Failed to copy to clipboard');
            setError(error);
            onCopyError?.(error);
        }
    }, [textToCopy, copiedDuration, onCopySuccess, onCopyError]);

    const displayLabel = label || textToCopy;
    const tooltipMessage = error
        ? 'Failed to copy'
        : copied
          ? 'Copied!'
          : 'Click to copy';

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={handleCopy}
                    className="group inline-flex items-center space-x-1 decoration-dotted hover:text-blue-400 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Copy ${displayLabel} to clipboard`}
                    disabled={error !== null}
                >
                    <span>{displayLabel}</span>
                    <span className="flex-shrink-0" aria-hidden="true">
                        {!copied ? (
                            <IconClipboard className="size-3 opacity-0 group-hover:opacity-100" />
                        ) : (
                            <IconClipboardCheck className="size-3" />
                        )}
                    </span>
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p className={error ? 'text-red-500' : undefined}>
                    {tooltipMessage}
                </p>
            </TooltipContent>
        </Tooltip>
    );
};

export default CopyToClipboard;
