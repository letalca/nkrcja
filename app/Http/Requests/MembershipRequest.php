<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\Models\Member;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class MembershipRequest extends FormRequest
{
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
        $query = (string) $this->get('query', null);

        $membership_statuses = $this->getCollectionFromRequest('membership_status');
        $membership_types = $this->getCollectionFromRequest('membership_type');


        $data = Member::query()
            ->when($query, function (Builder $builder, string $searchQuery): void {
                $builder->where(function (Builder $innerBuilder) use ($searchQuery): void {
                    $innerBuilder->where('first_name', 'ILIKE', "%{$searchQuery}%")
                        ->orWhere('last_name', 'ILIKE', "%{$searchQuery}%")
                        ->orWhere('middle_name', 'ILIKE', "%{$searchQuery}%")
                        ->orWhere('email', 'ILIKE', "%{$searchQuery}%");
                });
            })
            ->orderBy('first_name', 'asc')
            ->orderBy('last_name', 'asc')
            ->when($membership_statuses->isNotEmpty(), function (Builder $builder) use ($membership_statuses): void {
                $builder->whereIn('status', $membership_statuses->toArray());
            })
            ->when($membership_types->isNotEmpty(), function (Builder $builder) use ($membership_types): void {
                $builder->whereIn('membership_type', $membership_types->toArray());
            })
            ->paginate($this->integer('perPage', 10))
            ->withQueryString();

        $data->getCollection()
            ->transform(fn(Member $member) => $member->transform());

        return $data;
    }

    private function getCollectionFromRequest(string $key): Collection
    {
        $collection = collect([]);

        if ($this->has($key)) {
            $values = (string) $this->get($key);
            $decodedValues = base64_decode($values);
            $collection = collect(explode(',', $decodedValues));
        }

        return $collection;
    }


}
