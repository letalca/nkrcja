<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\MembershipStatus;
use App\Enums\MembershipType;
use App\Http\Requests\Membership\ListMembersRequest;
use App\Models\Member;
use Inertia\Inertia;
use Inertia\Response;

class MembershipController extends Controller
{
    public function index(ListMembersRequest $request): Response
    {
        $filters = [
            [
                'name' => 'Status',
                'options' => MembershipStatus::getFilters(),
                'order' => 1,
                'filter_key' => 'membership_status',
            ],
            [
                'name' => 'Type',
                'options' => MembershipType::getFilters(),
                'order' => 1,
                'filter_key' => 'membership_type',
            ],
        ];

        return Inertia::render('admin/membership/list', ['paginate' => $request->paginate(), 'filters' => $filters]);
    }

    public function personal(Member $member): Response
    {
        return Inertia::render('admin/membership/personal-data-form', ['data' => $member->transform()]);
    }

    public function contact(Member $member): Response
    {
        return Inertia::render('admin/membership/contact-info-form', ['data' => $member->transform()]);
    }

    public function address(Member $member): Response
    {
        return Inertia::render('admin/membership/address-form', ['data' => $member->transform()]);
    }

    public function education(Member $member): Response
    {
        return Inertia::render('admin/membership/education-info-form', ['data' => $member->transform()]);
    }

    public function occupation(Member $member): Response
    {
        return Inertia::render('admin/membership/occupation-form', ['data' => $member->transform()]);
    }
}
