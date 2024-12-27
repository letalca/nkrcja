<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\MembershipStatus;
use App\Enums\MembershipType;
use App\Http\Requests\Membership\ListMembersRequest;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

    public function form(Member $member): Response
    {
        Inertia::share('config.maxFileSize', config('nkrc.maxFileSize'));
        return Inertia::render('admin/membership/member-view-page', ['data' => $member->transform()]);
    }

    public function save(Request $request, Member $member, string $form): \Illuminate\Http\RedirectResponse
    {
        if ('image' === $form) {
            if ( ! $request->hasFile('image')) {
                return back()->withErrors([
                    'image' => 'No image provided',
                ]);
            }

            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $file = $request->file('image');

            $path = Storage::disk('public')->putFile('members', $file, 'public');

            $member->update(['image' => Storage::url($path)]);

            return back()->with([
                'message' => 'Image uploaded successfully',
            ]);
        }

        return back()->withErrors([
            'form' => 'Invalid form type',
        ]);
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
