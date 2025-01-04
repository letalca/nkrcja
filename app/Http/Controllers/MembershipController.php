<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Enums\Gender;
use App\Enums\Members;
use App\Exceptions\Memebers\SaveMembershipDataException;
use App\Http\Requests\Membership\ListMembersRequest;
use App\Http\Requests\Membership\SaveMembershipDataRequest;
use App\Models\Member;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
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
                'order' => 2,
                'filter_key' => 'membership_type',
            ],
        ];
        return Inertia::render('admin/membership/list', ['paginate' => $request->paginate(), 'filters' => $filters]);
    }

    public function form(int $memberId): Response
    {
        $member = Member::withRelationships()->findOrFail($memberId);
        Inertia::share('config', [
            'maxFileSize' => config('nkrc.maxFileSize'),
            'status' => Members\Status::getFilters(),
            'type' => Members\Type::getFilters(),
            'gender' => Gender::getFilters(),
        ]);

        return Inertia::render('admin/membership/member-view-page', ['data' => $member->transform()]);
    }

    public function save(SaveMembershipDataRequest $saveMembershipDataRequest): RedirectResponse
    {
        try {
            $saveMembershipDataRequest->save();
            return back()->with(['message' => $saveMembershipDataRequest->getMessage()]);
        } catch (ModelNotFoundException) {
            return back()->with(['error' => "Member not found"]);
        } catch (SaveMembershipDataException $e) {
            logger()->error('Membership save failed:', ['error' => $e->getMessage()]);
            return back()->with(['error' => $e->getMessage()]);
        } catch (Exception $e) {
            logger()->error('Membership save failed:', ['error' => $e->getMessage()]);
            return back()->with(['error' => "Failed to save membership data"]);
        }
    }
}
