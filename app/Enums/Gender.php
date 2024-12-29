<?php

declare(strict_types=1);

namespace App\Enums;

enum Gender: int
{
    use EnumExtension;

    case Male = 0;
    case Female = 1;

    public function getLabel(): string
    {
        return match ($this) {
            self::Male => 'Male',
            self::Female => 'Female',
        };
    }

    public static function asSelectable(?Gender $gender = null): array | null
    {
        if ( ! $gender) {
            return null;
        }
        return [
            'value' => $gender->value,
            'label' => $gender->getLabel(),
        ];
    }
}
