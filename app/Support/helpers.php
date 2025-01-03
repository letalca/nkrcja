<?php

declare(strict_types=1);

use Carbon\Carbon;
use Carbon\CarbonImmutable;
use Illuminate\Support\Str;

if ( ! function_exists('formattedDate')) {
    function formattedDate(Carbon | CarbonImmutable | null $date = null): array | null
    {
        if ( ! $date) {
            return null;
        }

        return [
            'timestamp' => $date->timestamp,
            'timezone' => $date->timezoneName,
            'dateString' => $date->format('F d, Y'),
            'shortString' => $date->toDateString(),
            'date' => $date,
        ];
    }
}
if ( ! function_exists('formatDateDifference')) {
    function formatDateDifference(Carbon | CarbonImmutable | null $date = null, Carbon | CarbonImmutable | null $other = null): string
    {
        if ( ! $date) {
            return 'N/A';
        }

        $now = $other ? $other->copy() : Carbon::now();
        $diffInYears = (int) $date->diffInYears($now);
        $diffInMonths = (int) $date->diffInMonths($now) % 12;

        if ($diffInMonths < 1 && $diffInYears < 1) {
            $diffInMonths = 1;
        }

        if ($diffInYears > 0) {
            return sprintf("{$diffInYears} %s, {$diffInMonths} %s", Str::plural('year', $diffInYears), Str::plural('month', $diffInMonths));
        }

        return sprintf("{$diffInMonths} %s", Str::plural('month', $diffInMonths));
    }
}
