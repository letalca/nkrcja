<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\MembershipStatus;
use App\Enums\MembershipType;
use App\Http\Requests\Membership\ListMembersRequest;
use App\Models\Member;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

    public function form(int $memberId): Response
    {
        $member = Member::with('media')->findOrFail($memberId);
        Inertia::share('config.maxFileSize', config('nkrc.maxFileSize'));
        return Inertia::render('admin/membership/member-view-page', ['data' => $member->transform()]);
    }

    public function save(Request $request, int $memberId, string $form): RedirectResponse
    {
        $member = Member::with('media')->findOrFail($memberId);
        if ('image' === $form) {
            if ( ! $request->hasFile('image')) {
                return back()->withErrors([
                    'image' => 'No image provided',
                ]);
            }
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            if ($member->hasMedia(Member::$mediaKey)) {
                $member->clearMediaCollection(Member::$mediaKey);
            }

            $member
                ->addMediaFromRequest('image')
                ->toMediaCollection(Member::$mediaKey);

            return back()->with([
                'message' => 'Image uploaded successfully',
            ]);
        }

        return back()->withErrors([
            'form' => 'Invalid form type',
        ]);
    }
}
