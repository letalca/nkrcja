<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

// TODO: write a phone class: https://github.com/Propaganistas/Laravel-Phone?tab=readme-ov-file

/**
 * Member class
 * @property string $rotary_id
 * @property string $email
 * @property string $primary_phone_number
 * @property string $secondary_phone_number
 * @property string $first_name
 * @property string $last_name
 * @property string $middle_name
 * @property array $age
 * @property Enums\Gender $gender
 * @property Enums\Members\Type $membership_type
 * @property Enums\Members\Status $status
 * @property bool $good_standing
 * @property Address $address
 * @property \Carbon\CarbonImmutable $date_of_birth
 * @property \Carbon\CarbonImmutable $induction_date
 * @property \Carbon\CarbonImmutable $created_at
 * @property \Carbon\CarbonImmutable $updated_at
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
        'address_id',
    ];

    public static function withRelationships($relationships = []): \Illuminate\Database\Eloquent\Builder
    {
        $relationships = array_merge(['address', 'media'], $relationships);
        $relationships = array_unique(array_merge(['address', 'media'], $relationships));
        return static::with($relationships);
    }

    public function name(): Attribute
    {
        return Attribute::make(
            get: fn() => "{$this->first_name} {$this->last_name}",
        );
    }

    public function age(): Attribute
    {
        return Attribute::make(
            get: function (): array {
                $july = now()->startOfYear()->addMonths(7);
                $ageAtNextJuly = null;
                if ($this->date_of_birth) {
                    $ageAtNextJuly = (int) $this->date_of_birth->diffInYears($july);
                }
                return [
                    'current' => $this->date_of_birth?->age,
                    'nextJuly' => $ageAtNextJuly,
                ];
            },
        );
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'rotary_id' => $this->rotary_id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->primary_phone_number,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'middle_name' => $this->middle_name,
            'gender' => Enums\Gender::asSelectable($this->gender),
            'membership_type' => Enums\Members\Type::asSelectable($this->membership_type),
            'status' => Enums\Members\Status::asSelectable($this->status),
            'is_in_good_standing' => $this->good_standing,
            'address' => $this->address?->transform(),
            'date_of_birth' => formattedDate($this->date_of_birth),
            'induction_date' => formattedDate($this->induction_date),
            'age' => $this->age,
            'images' => $this->getAllMediaUrls(),
            'current_club_position' => 50 === $this->id ? 'Membership Chair' : null,
            'years_active' => formatDateDifference($this->induction_date),
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

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'immutable_date',
            'created_at' => 'immutable_date',
            'updated_at' => 'immutable_date',
            'induction_date' => 'immutable_date',
            'status' => Enums\Members\Status::class,
            'gender' => Enums\Gender::class,
            'membership_type' => Enums\Members\Type::class,
            'good_standing' => 'boolean',
        ];
    }
}
