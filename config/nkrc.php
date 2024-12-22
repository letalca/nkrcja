<?php

declare(strict_types=1);

return [
    'admin' => [
        'email' => env('ADMIN_EMAIL'),
        'password' => env('ADMIN_PASSWORD'),
    ],
    'hasGoogleSignIn' => env('GOOGLE_CLIENT_ID') && env('GOOGLE_CLIENT_SECRET'),
    'paginate' => [
        'perPage' => 20,
    ],
];
