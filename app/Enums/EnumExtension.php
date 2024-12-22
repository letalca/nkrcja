<?php

declare(strict_types=1);

namespace App\Enums;

use Illuminate\Support\Collection;

// https://github.com/othyn/php-enum-enhancements/tree/main

trait EnumExtension
{
    public static function values(): array
    {
        $values = [];
        foreach (self::cases() as $enum) {
            $values[] = $enum->value ?? $enum->name;
        }
        return $values;
    }

    public static function getFilters(): Collection
    {
        return collect(static::cases())->transform(function ($value, $key): array {
            return [
                'label' => $value->getLabel(),
                'id' => $key,
                'value' => $key,
            ];
        });
    }
}
