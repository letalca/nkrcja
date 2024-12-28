<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

// TODO: write a phone class: https://github.com/Propaganistas/Laravel-Phone?tab=readme-ov-file

/**
 * Member class
 * @property string $email
 * @property string $primary_phone_number
 * @property string $secondary_phone_number
 * @property string $first_name
 * @property string $last_name
 * @property string $middle_name
 * @property Enums\Gender $gender
 * @property Enums\Members\Type $membership_type
 * @property Enums\Members\Status $status
 * @property bool $good_standing
 * @property array $address
 * @property \Carbon\Carbon $date_of_birth
 * @property \Carbon\Carbon $induction_date
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read string $name
 *
 */
final class Member extends Model implements HasMedia
{
    /** @use HasFactory<\Database\Factories\MemberFactory> */
    use HasFactory;
    use InteractsWithMedia;

    public static $mediaKey = 'member-profile-image';

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function name(): Attribute
    {
        return Attribute::make(
            get: fn() => "{$this->first_name} {$this->last_name}",
        );
    }

    public function age(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->date_of_birth?->age,
        );
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'rotary_id' => str()->random(10),
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->primary_phone_number,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'middle_name' => $this->middle_name,
            'gender' => $this->gender?->getLabel(),
            'membership_type' => $this->membership_type?->getLabel(),
            'status' => $this->status?->getLabel(),
            'is_in_good_standing' => $this->good_standing,
            'address' => $this->address,
            'date_of_birth' => $this->date_of_birth,
            'induction_date' => $this->induction_date,
            'age' => $this->age,
            'images' => $this->getAllMediaUrls(),
        ];
    }

    public function getAllMediaUrls(): array
    {
        $media = $this->getFirstMedia(static::$mediaKey);

        if ( ! $media) {
            return [
                'original' => null,
                'thumb' => null,
                'medium' => null,
            ];
        }

        return [
            'original' => $media->getUrl(),
            'thumb' => $media->getUrl('thumb'),
            'medium' => $media->getUrl('medium'),
        ];
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(100)
            ->height(100)
            ->performOnCollections(static::$mediaKey);

        $this->addMediaConversion('medium')
            ->width(400)
            ->height(400)
            ->performOnCollections(static::$mediaKey);
    }

    protected function casts(): array
    {
        return [
            'address' => 'json',
            'date_of_birth' => 'date',
            'induction_date' => 'date',
            'status' => Enums\Members\Status::class,
            'gender' => Enums\Gender::class,
            'membership_type' => Enums\Members\Type::class,
            'good_standing' => 'boolean',
        ];
    }
}
