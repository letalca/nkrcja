import CopyToClipboard from '@/components/copy-to-clipboard';
import LongText from '@/components/long-text';

export const FieldValue = ({
    label,
    value,
    canCopy = false,
    longText = false,
}: {
    label: string;
    longText?: boolean;
    value?: string | number | null;
    canCopy?: boolean;
}) => {
    return (
        <div>
            <p className="text-sm font-medium">{label}</p>
            {canCopy && value ? (
                <CopyToClipboard
                    textClass="text-sm"
                    textToCopy={value.toString()}
                />
            ) : longText && value ? (
                <LongText className="max-w-48 text-sm">{value}</LongText>
            ) : (
                <p className="text-sm">{value || 'N/A'}</p>
            )}
        </div>
    );
};
