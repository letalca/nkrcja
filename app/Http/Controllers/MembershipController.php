<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\Members\SaveImageAction;
use App\Enums\Members;
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

    public function save(int $memberId, string $form): RedirectResponse
    {
        if ('image' === $form) {
            (new SaveImageAction($memberId))->execute();

            return back()->with([
                'message' => 'Image uploaded successfully',
            ]);
        }

        return back()->withErrors([
            'form' => 'Invalid form type',
        ]);
    }
}
