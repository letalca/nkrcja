<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table): void {
            if (Schema::hasColumn('members', 'primary_phone_number')) {
                $table->dropColumn('primary_phone_number');
            }
            if (Schema::hasColumn('members', 'secondary_phone_number')) {
                $table->dropColumn('secondary_phone_number');
            }

            $table->json('phones')
                ->after('date_of_birth')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table): void {
            $table->dropColumn('phones');
        });
    }
};
