<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user ? new UserResource($user) : [],
            ],
            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'error' =>  fn() => $request->session()->get('error'),
                'has_error' =>  fn() => $request->session()->has('error'),
            ],
            'club' => config('nkrc.club'),
        ]);
    }
}
