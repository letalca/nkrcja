<?php

declare(strict_types=1);

namespace App\Actions\Members;

use App\Actions\Contracts\SaveMemberDetailsAction;
use App\Enums\Gender;
use App\Enums\Members;
use App\Exceptions\Memebers\SaveMembershipDataException;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class SavePersonalDataAction extends SaveMemberDetailsAction
{
    private const NULLABLE_FIELDS = [
        'middle_name',
        'rotary_id',
        'date_of_birth',
        'induction_date',
    ];

    private const MAX_ROTARY_ID_LENGTH = 15;

    public static function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email:rfc', 'max:255'],
            'rotary_id' => ['nullable', 'string', sprintf('max:%d', self::MAX_ROTARY_ID_LENGTH)],
            'membership_type' => [
                'required',
                'integer',
                Rule::in(Members\Type::values()),
            ],
            'status' => [
                'required',
                'integer',
                Rule::in(Members\Status::values()),
            ],
            'gender' => [
                'required',
                'integer',
                Rule::in(Gender::values()),
            ],
            'date_of_birth' => ['nullable', 'date', 'before:today'],
            'induction_date' => ['nullable', 'date', 'before_or_equal:today'],
            'is_in_good_standing' => ['required', 'boolean'],
        ];
    }


    public function execute(array $validated): void
    {
        try {
            DB::transaction(function () use ($validated): void {
                $data = $this->prepareData($validated);
                $this->member->update($data);
            });
        } catch (Exception $e) {
            logger()->error('Failed to update personal data', [
                'member_id' => $this->member->id,
                'error' => $e->getMessage(),
            ]);
            throw new SaveMembershipDataException(
                'Failed to update personal data',
                previous: $e,
            );
        }

    }

    private function prepareData(array $validated): array
    {
        foreach (self::NULLABLE_FIELDS as $field) {
            $validated[$field] = $this->normalizeNullableField($validated, $field);
        }

        $validated['good_standing'] = $validated['is_in_good_standing'];
        unset($validated['is_in_good_standing']);

        return $validated;
    }

    private function normalizeNullableField(array $data, string $field): mixed
    {
        return isset($data[$field]) && '' !== $data[$field]
            ? $data[$field]
            : null;
    }
}
