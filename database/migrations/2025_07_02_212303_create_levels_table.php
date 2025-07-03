<?php

use App\Enums\LevelCycleEnum;
use App\Enums\SecondaryCycleEnum;
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
        Schema::create('levels', function (Blueprint $table) {
            $table->id();
            $table->foreignId('school_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('name');
            $table->string('alias');
            $table->enum(
                'cycle',
                array_map(
                    fn(LevelCycleEnum $enum) => $enum->value,
                    LevelCycleEnum::cases()
                )
            );

            $table->enum(
                'sub_cycle',
                array_map(
                    fn(SecondaryCycleEnum $enum) => $enum->value,
                    SecondaryCycleEnum::cases()
                )
            )->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('levels');
    }
};
