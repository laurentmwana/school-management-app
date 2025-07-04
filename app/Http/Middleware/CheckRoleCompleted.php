<?php

namespace App\Http\Middleware;

use App\Enums\RoleUserEnum;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleCompleted
{
    private const SITUATIONS = ['yes', 'no'];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $situation): Response
    {
        if (!in_array($situation, self::SITUATIONS, true)) {
            abort(500, "Situation '{$situation}' invalide pour le middleware CheckRoleCompleted.");
        }

        $user = $request->user();

        if (!($user instanceof User)) {
            return $next($request);
        }

        $expectedRoles = [
            RoleUserEnum::ADMIN->value,
            RoleUserEnum::COMPLETED->value,
        ];

        // Vérifie que les deux rôles sont présents
        $hasCompletedRole = empty(array_diff($expectedRoles, $user->roles));

        if ($situation === 'yes' && !$hasCompletedRole) {
            return redirect()->route('step', ['step' => 1]);
        }

        if ($situation === 'no' && $hasCompletedRole) {
            return redirect()->route('dashboard');
        }

        return $next($request);
    }
}
