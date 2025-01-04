<?php

declare(strict_types=1);

namespace App\Actions\Contracts;

use App\Models\Member;

abstract class SaveMemberDetailsAction
{
    public function __construct(protected readonly Member $member) {}
    abstract public static function rules(): array;
    abstract public function execute(array $validated): void;
    public static function messages(): array
    {
        return [];
    }

}
