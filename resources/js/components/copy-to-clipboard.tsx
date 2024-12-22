import { IconClipboard, IconClipboardCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

type CopyToClipboardProps = {
    textToCopy: string;
    label?: string;
};

const CopyToClipboard = ({ textToCopy, label }: CopyToClipboardProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    label = label || textToCopy;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    onClick={handleCopy}
                    className="group flex cursor-pointer items-center space-x-1 decoration-dotted hover:text-blue-400 hover:underline"
                >
                    <span>{label}</span>{' '}
                    <span className="flex-shrink-0">
                        {!copied ? (
                            <IconClipboard className="size-3 opacity-0 group-hover:opacity-100" />
                        ) : (
                            <IconClipboardCheck className="size-3" />
                        )}
                    </span>
                </div>
            </TooltipTrigger>
            <TooltipContent>
                {copied ? 'Copied!' : 'Click to copy'}
            </TooltipContent>
        </Tooltip>
    );
};

export default CopyToClipboard;
