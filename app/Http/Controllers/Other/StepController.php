<?php

namespace App\Http\Controllers\Other;

use App\Enums\RoleUserEnum;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\NewSchool;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class StepController extends Controller
{
    private const MIN_STEP = 1;
    private const MAX_STEP = 4;

    public function index(Request $request, int $step): Response|RedirectResponse
    {
        if (!$this->isStepValid($step)) {
            return $this->redirectToStep(self::MIN_STEP);
        }

        $user = $request->user()->load('schools');
        $stepSessionData = Session::get("school.step$step", []);

        return Inertia::render("step/step-$step", [
            'user' => $user,
            'step' => $step,
            'dataSession' => $stepSessionData,
        ]);
    }

    public function store(Request $request, int $step): RedirectResponse
    {
        if (!$this->isStepValid($step)) {
            return $this->redirectToStep(self::MIN_STEP);
        }

        $user = $request->user();

        if ($step === self::MIN_STEP) {
            return $this->redirectToStep(self::MIN_STEP + 1);
        }

        if ($step === self::MAX_STEP) {
            return $this->completeProfile($user);
        }

        $validationRules = $this->getValidationRules($step);

        if (is_null($validationRules)) {
            abort(404, "L'étape $step est inconnue.");
        }

        $data = $request->validate($validationRules);
        Session::put("school.step$step", $data);

        return $this->redirectToStep($step + 1);
    }

    private function getValidationRules(int $step): ?array
    {
        return match ($step) {
            2 => [
                'name' => 'required|string|max:255',
                'alias' => 'required|string|max:20',
            ],
            3 => [
                'address' => 'required|string|between:10,255',
                'description' => 'required|string|min:30|max:90000',
            ],
            default => null,
        };
    }

    private function completeProfile(User $user): RedirectResponse
    {
        $step2 = Session::get('school.step2', []);
        $step3 = Session::get('school.step3', []);
        $step4 = Session::get('school.step4', []); // À remplir selon besoins futurs

        $schoolData = array_merge(
            $step2,
            [
                'address' => $step3['address'] ?? '',
                'description' => Str::markdown($step3['description'] ?? ''),
            ],
            $step4
        );

        $school = $user->schools()->create($schoolData);

        $user->update([
            'roles' => [
                RoleUserEnum::COMPLETED->value,
                RoleUserEnum::ADMIN->value,
            ],
        ]);

        $user->notify(new NewSchool($school));
        Session::forget('school');

        return redirect()
            ->route('dashboard')
            ->with('success', 'Votre école a été enregistrée avec succès.');
    }

    private function isStepValid(int $step): bool
    {
        return $step >= self::MIN_STEP && $step <= self::MAX_STEP;
    }

    private function redirectToStep(int $step): RedirectResponse
    {
        return redirect()->route('step', ['step' => $step]);
    }
}
