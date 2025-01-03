<?php

declare(strict_types=1);

namespace App\Actions\Members;

use App\Enums\Gender;
use App\Enums\Members;
use App\Models\Member;
use Illuminate\Validation\Rule;

class SavePersonalDataAction
{
    private array $nullableFields = [
        'middle_name',
        'rotary_id',
        'date_of_birth',
        'induction_date',
    ];
    public function __construct(private readonly int $memberId) {}

    public function execute(): void
    {
        $member = Member::withRelationships()->findOrFail($this->memberId);
        $validated = $this->validateRequest();

        foreach ($this->nullableFields as $field) {
            if (!isset($validated[$field]) || $validated[$field] === '') {
                $validated[$field] = null;
            }
        }

        $validated['good_standing'] = $validated['is_in_good_standing'];
        unset($validated['is_in_good_standing']);

        $member->update($validated);

    }

    private function validateRequest(): array
    {
        return request()->validate([
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'middle_name' => ['nullable', 'string'],
            'rotary_id' => ['nullable', 'string', 'max:15'],
            'gender' => [
                'required',
                'integer',
                Rule::in(Gender::values()),
            ],
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
            'date_of_birth' => ['nullable', 'date'],
            'induction_date' => ['nullable', 'date'],
            'is_in_good_standing' => ['required', 'boolean'],
        ]);
    }
}
