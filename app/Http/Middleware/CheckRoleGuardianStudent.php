<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleGuardianStudent
{
    private const SITUATIONS = ['yes', 'no'];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string $situation): Response
    {
        $user = $request->user();

        if (($user instanceof User &&  !isParent($user->roles))) {
            abort(Response::HTTP_FORBIDDEN, 'Accès refusé : vous devez un parent pour accéder à cette ressource.');
        }

        return $next($request);
    }
}
