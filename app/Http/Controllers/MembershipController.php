<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Gender;
use App\Enums\Members;
use App\Enums\Members\FormType;
use App\Http\Requests\Membership\ListMembersRequest;
use App\Models\Member;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Config;
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
                'order' => 2,
                'filter_key' => 'membership_type',
            ],
        ];
        logger()->debug("Done with request");
        return Inertia::render('admin/membership/list', ['paginate' => $request->paginate(), 'filters' => $filters]);
    }

    public function form(int $memberId): Response
    {
        $member = Member::with('media')->findOrFail($memberId);
        Inertia::share('config', [
            'maxFileSize' => config('nkrc.maxFileSize'),
            'status' => Members\Status::getFilters(),
            'type' => Members\Type::getFilters(),
            'gender' => Gender::getFilters(),
        ]);

        return Inertia::render('admin/membership/member-view-page', ['data' => $member->transform()]);
    }

    public function save(int $memberId, FormType $form): RedirectResponse
    {
        try {
            $form->save($memberId);
        } catch (ModelNotFoundException) {
            back()->with(['error' => "Member not found with id: {$memberId}"]);
        }
        return back()->with(['message' => $form->message()]);
    }
}
