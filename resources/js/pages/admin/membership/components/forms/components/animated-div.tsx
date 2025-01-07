import { FormFieldProps } from '@/components/form-fields/types';
import {
    AnimatePresence,
    type AnimationDefinition,
    motion,
} from 'framer-motion';
import { FC, useCallback } from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { CellType, Phones } from '../schemas';
import { PhoneField } from './phone-field';

const animations = {
    initial: { opacity: 0, height: 0, id: 'initial-animation' },
    animate: { opacity: 1, height: 'auto', id: 'current-animation' },
    exit: { opacity: 0, height: 0, id: 'exit-animation' },
};
type PhoneField = UseFieldArrayReturn<Phones>;
type Props = {
    phoneFields: PhoneField;
    cellTypes: CellType[];
    control: FormFieldProps['control'];
};

export const AnimatedDiv: FC<Props> = ({ phoneFields, cellTypes, control }) => {
    const handleAnimationComplete = useCallback(
        (definition: AnimationDefinition, index: number) => {
            const isLastField: boolean =
                index === phoneFields.fields.length - 1;
            const isExitAnimation =
                typeof definition === 'object' &&
                definition !== null &&
                'id' in definition &&
                definition.id === 'exit-animation';
            if (isLastField && isExitAnimation) {
                phoneFields.remove(index);
            }
        },
        [phoneFields],
    );
    return (
        <AnimatePresence>
            {phoneFields.fields.map((field, index) => (
                <motion.div
                    key={field.id}
                    {...animations}
                    transition={{ duration: 0.2 }}
                    onAnimationComplete={(def) =>
                        handleAnimationComplete(def, index)
                    }
                >
                    <PhoneField
                        onRemove={() => phoneFields.remove(index)}
                        index={index}
                        isRemovable={index > 0}
                        cellTypes={cellTypes}
                        control={control}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
    );
};
