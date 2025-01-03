<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Address extends Model
{
    use HasFactory;

    protected $casts = [
        'additional_info' => 'string',
    ];

    protected $hidden = [
        'id', 'created_at', 'updated_at', 'member_id',
    ];

    public function displayValue(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                return implode(', ', array_filter([
                    $this->street,
                    $this->city_or_town,
                    $this->parish,
                    $this->state_or_province,
                    $this->postal_code,
                    $this->country,
                ]));
            },
        );
    }

    public function transform(): array {
        return [
            'street' => $this->street,
            'city_or_town' => $this->city_or_town,
            'parish' => $this->parish,
            'state_or_province' => $this->state_or_province,
            'postal_code' => $this->postal_code,
            'country' => $this->country,
            'displayString' => $this->displayValue,
        ];
    }

    public function getDisplayStringAttribute(): string
    {
        return $this->displayValue;
    }

    public function member(): HasOne
    {
        return $this->hasOne(Member::class);
    }
}
