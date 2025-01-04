<?php

declare(strict_types=1);

namespace App\Http\Requests\Membership;

use App\Enums\Members\FormType;
use App\Models\Member;
use Illuminate\Container\Attributes\RouteParameter;
use Illuminate\Foundation\Http\FormRequest;
use InvalidArgumentException;

class SaveMembershipDataRequest extends FormRequest
{
    private readonly FormType $form;
    private readonly Member $member;
    public function __construct(#[RouteParameter('memberId')] int $memberId, #[RouteParameter('form')] string $form)
    {
        $formType = FormType::tryFrom($form);
        if ( ! $formType) {
            throw new InvalidArgumentException("Invalid form type: {$form}");
        }
        $this->form = $formType;
        $this->member = Member::withRelationships()->findOrFail($memberId);
    }

    public function save(): void
    {
        $this->form->save($this->member, $this->validated());
    }
    public function getMessage()
    {
        return $this->form->message();
    }

    public function rules(): array
    {
        logger()->debug("Validating SaveMembershipDataRequest: {$this->member->id} with form {$this->form->name}:{$this->form->value}");
        return $this->form->rules();
    }

    public function messages(): array
    {
        return $this->form->messages();
    }
}
