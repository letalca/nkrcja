<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Members;
use App\Enums\Members\FormType;
use App\Http\Requests\Membership\ListMembersRequest;
use App\Models\Member;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MembershipController extends Controller
{
    public function index(ListMembersRequest $request): Response
    {
        $filters = [
            [
                'name' => 'Status',
                'options' => Members\Status::getFilters(),
                'order' => 1,
                'filter_key' => 'membership_status',
            ],
            [
                'name' => 'Type',
                'options' => Members\Type::getFilters(),
                'order' => 1,
                'filter_key' => 'membership_type',
            ],
        ];

        return Inertia::render('admin/membership/list', ['paginate' => $request->paginate(), 'filters' => $filters]);
    }

    public function form(int $memberId): Response
    {
        $member = Member::with('media')->findOrFail($memberId);
        Inertia::share('config.maxFileSize', config('nkrc.maxFileSize'));
        return Inertia::render('admin/membership/member-view-page', ['data' => $member->transform()]);
    }

    public function save(int $memberId, FormType $form): RedirectResponse
    {
        $form->save($memberId);
        return back()->with(['message' => $form->message()]);
    }
}
