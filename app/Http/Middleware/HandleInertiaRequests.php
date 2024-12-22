<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? new UserResource($user) : null,
                'club' => [
                    'name' => 'Rotaract Club of New Kingston',
                    'zone' => '34',
                    'district' => '7020',
                    'country' => 'Jamaica',
                    'abbr' => 'NKRC',
                ],
            ],
        ];
    }
}
