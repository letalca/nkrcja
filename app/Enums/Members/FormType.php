<?php

declare(strict_types=1);

namespace App\Enums\Members;

use App\Actions\Members\SaveImageAction;
use App\Actions\Members\SavePersonalDataAction;
use App\Actions\Members\SavePhoneAction;
use App\Enums\EnumExtension;
use App\Models\Member;
use Nette\NotImplementedException;

enum FormType: string
{
    use EnumExtension;

    case PERSONAL = 'personal';
    case CONTACT = 'contact';
    case ADDRESS = 'address';
    case EDUCATION = 'education';
    case EMPLOYMENT = 'employment';
    case IMAGE = 'image';

    private const ACTIONS = [
        self::IMAGE->value => SaveImageAction::class,
        self::PERSONAL->value => SavePersonalDataAction::class,
        self::CONTACT->value => SavePhoneAction::class,
        self::ADDRESS->value => null,
        self::EDUCATION->value => null,
        self::EMPLOYMENT->value => null,
    ];

    private const MESSAGES = [
        self::IMAGE->value => 'Image uploaded successfully!',
        self::PERSONAL->value => 'Personal information has been updated successfully!',
        self::CONTACT->value => 'Contact information has been updated successfully!',
        self::ADDRESS->value => 'Address information has been updated successfully!',
        self::EDUCATION->value => 'Education information has been updated successfully!',
        self::EMPLOYMENT->value => 'Employment information has been updated successfully!',
    ];

    public function save(Member $member, $validated = []): void
    {
        $actionClass = $this->getActionClass();
        $action = new $actionClass($member);
        $action->execute($validated);
        //TODO: dispatch event
    }

    public function rules(): array
    {
        $actionClass = $this->getActionClass();
        return $actionClass::rules();
    }

    public function message(): string
    {
        return self::MESSAGES[$this->value];
    }
    public function messages(): array
    {
        $actionClass = $this->getActionClass();
        return $actionClass::messages();
    }

    private function getActionClass()
    {
        $actionClass = self::ACTIONS[$this->value] ?? null;
        if ( ! $actionClass) {
            throw new NotImplementedException("Action not implemented for {$this->value}");
        }
        return $actionClass;
    }
}
