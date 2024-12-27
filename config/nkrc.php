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
    'club' => [
        'name' => env('APP_NAME'),
        'zone' => env('CLUB_ZONE'),
        'district' => env('CLUB_DISTRICT'),
        'country' => env('CLUB_COUNTRY'),
        'abbr' => env('CLUB_ABBR'),
        'email' => env('CLUB_SUPPORT_EMAIL')
    ],
    'maxFileSize' => 5,
];
