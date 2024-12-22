<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\MembershipStatus;
use App\Http\Requests\MembershipRequest;
use Inertia\Inertia;
use Inertia\Response;

class MembershipController extends Controller
{
    public function index(MembershipRequest $request): Response
    {
        $filters = [
            [
                'name' => 'Status',
                'options' => MembershipStatus::getFilters(),
                'order' => 1,
                'filter_key' => 'membership_status',
            ],
        ];

        return Inertia::render('admin/membership/list', ['paginate' => $request->paginate(), 'filters' => $filters]);
    }
}
