<?php

use App\Models\Address;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('street');
            $table->string('city_or_town');
            $table->string('parish')->nullable();
            $table->string('state_or_province')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country');
            $table->text('additional_info')->nullable();
            $table->timestamps();
        });

        Schema::table('members', function (Blueprint $table) {
            if (Schema::hasColumn('members', 'address')) {
                $table->dropColumn('address');
            }

            $table->foreignId('address_id')
                ->nullable()
                ->constrained('addresses')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('members', function (Blueprint $table) {
            $table->dropForeign(['address_id']);
            $table->dropColumn('address_id');
        });
        Schema::dropIfExists('addresses');
    }
};
