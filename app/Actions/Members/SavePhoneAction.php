<?php

declare(strict_types=1);

namespace App\Actions\Members;

use App\Actions\Contracts\SaveMemberDetailsAction;

class SavePhoneAction extends SaveMemberDetailsAction
{
    public static function rules(): array
    {
        return  [
            'phones' => ['required', 'array', 'max:4', 'min:1'],
            'phones.*.number' => ['required', 'digits_between:7,15'],
            'phones.*.type' => ['nullable', 'in:cell,mobile,work,home,other'],
            'phones.*.primary' => ['nullable', 'boolean'],
            'phones.*.whatsapp' => ['nullable', 'boolean'],
        ];
    }

    public static function messages(): array
    {
        return [
            'phones.required' => 'The phones field is required.',
            'phones.array' => 'The phones field must be an array.',
            'phones.max' => 'You cannot have more than 4 phone entries.',
            'phones.*.number.required' => 'The phone number is required.',
            'phones.*.number.digits_between' => 'The phone number must be between 7 and 15 digits.',
            'phones.*.type.in' => 'The phone type must be one of: cell, mobile, work, home, other.',
            'phones.*.primary.boolean' => 'The primary field must be true or false.',
            'phones.*.whatsapp.boolean' => 'The WhatsApp field must be true or false.',
        ];
    }

    public function execute(array $validated): void
    {
        $data = collect($validated['phones'])->transform(
            function ($phone) {
                $p = new class ($phone) {
                    private string $number;
                    private string $type = 'cell';
                    private bool $primary = false;
                    private bool $whatsapp = false;

                    public function __construct(array $data)
                    {
                        foreach ($data as $key => $value) {
                            if (property_exists($this, $key)) {
                                $this->{$key} = $value;
                            }
                        }
                    }

                    public function getData(): array
                    {
                        $whatsapp = null;
                        if ($this->whatsapp) {
                            $whatsapp = "https://wa.me/{$this->number}";
                        }
                        return [
                            'number' => $this->number,
                            'type' => $this->type,
                            'primary' => $this->primary,
                            'whatsapp' => $whatsapp,
                        ];
                    }

                    public function setPrimary(): void
                    {
                        $this->primary = true;
                    }

                    public function isPrimary(): bool
                    {
                        return $this->primary;
                    }
                };
                return $p;
            },
        );

        $hasPrimary = $data->contains(fn($phone) => $phone->isPrimary());
        if ( ! $hasPrimary && $data->isNotEmpty()) {
            $data->first()->setPrimary();
        }

        $phones = $data->map(fn($phone) => $phone->getData());

        $this->member->update([
            'phones' => $phones->toArray(),
        ]);
    }

}
