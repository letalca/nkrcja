import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React from 'react';

interface DatePickerProps {
    initialDate?: Date;
    onDateChange?: (date: Date) => void;
    minYear?: number;
    maxYear?: number;
    className?: string;
    disabled?: CalendarProps['disabled'];
}

const DatePicker: React.FC<DatePickerProps> = ({
    initialDate = new Date(),
    onDateChange,
    minYear = 1980,
    maxYear = new Date().getFullYear(),
    className = '',
    disabled,
}) => {
    const [date, setDate] = React.useState<Date>(
        new Date(
            Math.min(initialDate.getFullYear(), maxYear),
            initialDate.getMonth(),
            initialDate.getDay(),
        ),
    );
    const years: number[] = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i,
    );

    const months: { name: string; value: number }[] = [
        { name: 'January', value: 0 },
        { name: 'February', value: 1 },
        { name: 'March', value: 2 },
        { name: 'April', value: 3 },
        { name: 'May', value: 4 },
        { name: 'June', value: 5 },
        { name: 'July', value: 6 },
        { name: 'August', value: 7 },
        { name: 'September', value: 8 },
        { name: 'October', value: 9 },
        { name: 'November', value: 10 },
        { name: 'December', value: 11 },
    ];

    const handleMonthChange = (newMonth: string): void => {
        const newDate = new Date(date);
        newDate.setMonth(parseInt(newMonth));
        setDate(newDate);
        onDateChange?.(newDate);
    };

    const handleYearChange = (newYear: string): void => {
        const newDate = new Date(date);
        newDate.setFullYear(parseInt(newYear));
        setDate(newDate);
        onDateChange?.(newDate);
    };

    const handleDateSelect = (newDate: Date | undefined): void => {
        if (newDate) {
            setDate(newDate);
            onDateChange?.(newDate);
        }
    };

    return (
        <div className={`space-y-4 ${className} rounded-md p-3`}>
            <div className="flex space-x-2">
                <Select
                    value={date.getMonth().toString()}
                    onValueChange={handleMonthChange}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((month) => (
                            <SelectItem
                                key={month.value}
                                value={month.value.toString()}
                            >
                                {month.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={date.getFullYear().toString()}
                    onValueChange={handleYearChange}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                defaultMonth={date}
                disabled={disabled}
            />
        </div>
    );
};

export default DatePicker;
