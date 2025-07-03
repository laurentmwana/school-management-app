<?php

use App\Enums\GenderEnum;
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
        Schema::create('parent_students', function (Blueprint $table) {
            $table->id();
             $table->string('name');
            $table->string('firstname');
            $table->string('registration_token')->unique();
            $table->enum(
                'gender',
                array_map(
                    fn(GenderEnum $enum) => $enum->value,
                    GenderEnum::cases()
                )
            );

            $table->string('phone')->unique();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            $table->timestamps();
            $table->softDeletes();

        });

         Schema::table('students', function (Blueprint $table) {
            $table->foreignId('parent_student_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parent_students');
    }
};
