<?php

namespace App\Http\Middleware;

use App\Enums\RoleUserEnum;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleParent
{
    private const SITUATIONS = ['yes', 'no'];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $situation): Response
    {
        $user = $request->user();

        if (!$user || !$user->role !== RoleUserEnum::PARENT->value) {
            abort(Response::HTTP_FORBIDDEN, 'Accès refusé : vous devez un parent pour accéder à cette ressource.');
        }

        return $next($request);
    }
}
