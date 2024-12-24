<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('members', function (Blueprint $table): void {
            $table->index('user_id');

            $table->index('status', 'idx_members_status');
            $table->index('membership_type', 'idx_members_type');

            $table->index(['first_name', 'last_name'], 'idx_members_name_sort');

            $table->index('good_standing');
        });

        DB::statement('CREATE EXTENSION IF NOT EXISTS pg_trgm');

        DB::statement('CREATE INDEX idx_members_first_name_trigram ON members USING gin (first_name gin_trgm_ops)');
        DB::statement('CREATE INDEX idx_members_last_name_trigram ON members USING gin (last_name gin_trgm_ops)');
        DB::statement('CREATE INDEX idx_members_email_trigram ON members USING gin (email gin_trgm_ops)');
    }

    public function down(): void
    {
        Schema::table('members', function (Blueprint $table): void {
            $table->dropIndex('idx_members_status');
            $table->dropIndex('idx_members_type');
            $table->dropIndex('idx_members_name_sort');
            $table->dropIndex(['user_id']);
            $table->dropIndex(['good_standing']);
        });

        DB::statement('DROP INDEX IF EXISTS idx_members_first_name_trigram');
        DB::statement('DROP INDEX IF EXISTS idx_members_last_name_trigram');
        DB::statement('DROP INDEX IF EXISTS idx_members_email_trigram');
    }
};
