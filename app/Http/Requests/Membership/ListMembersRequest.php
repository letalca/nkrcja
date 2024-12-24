<?php

declare(strict_types=1);

namespace App\Http\Requests\Membership;

use App\Enums\MembershipStatus;
use App\Enums\MembershipType;
use App\Http\Requests\FormRequest;
use App\Models\Member;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ListMembersRequest extends FormRequest
{
    private const SEARCH_COLUMNS = [
        'first_name',
        'last_name',
        'middle_name',
        'email',
    ];

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [

        ];
    }


    public function paginate(): LengthAwarePaginator
    {
        $searchQuery = (string) $this->get('query', '');
        $statusFilters = $this->getCollectionFromRequest('membership_status');
        $typeFilters = $this->getCollectionFromRequest('membership_type');

        $query = Member::query()
            ->when(
                $searchQuery,
                $this->buildSearchQuery(...),
            )
            ->tap($this->applySort(...))
            ->tap($this->applyStatusFilters($statusFilters))
            ->tap($this->applyTypeFilters($typeFilters));

        $paginatedResults = $query->paginate(
            $this->integer('perPage', config('nkrc.paginate.perPage')),
        )->withQueryString();

        $paginatedResults->through(fn(Member $member) => $member->transform());

        return $paginatedResults;
    }

    private function buildSearchQuery(): callable
    {
        return function (Builder $builder, string $searchQuery): void {
            $builder->where(function (Builder $innerBuilder) use ($searchQuery): void {
                foreach (self::SEARCH_COLUMNS as $column) {
                    $innerBuilder->orWhere($column, 'ILIKE', "%{$searchQuery}%");
                }
            });
        };
    }

    private function applySort(Builder $query): void
    {
        $query
            ->orderBy('first_name', 'asc')
            ->orderBy('last_name', 'asc');
    }

    private function applyStatusFilters(Collection $statusFilters): callable
    {
        return function (Builder $query) use ($statusFilters): void {
            if ($statusFilters->isNotEmpty()) {
                $query->whereIn('status', $statusFilters->toArray());
            } else {
                $query->whereIn('status', MembershipStatus::getValidMembers()->toArray());
            }
        };
    }

    private function applyTypeFilters(Collection $typeFilters): callable
    {
        return function (Builder $query) use ($typeFilters): void {
            if ($typeFilters->isNotEmpty()) {
                $query->whereIn('membership_type', $typeFilters->toArray());
            } else {
                $query->whereNotIn('membership_type', [MembershipType::Alumni->value]);
            }
        };
    }
}