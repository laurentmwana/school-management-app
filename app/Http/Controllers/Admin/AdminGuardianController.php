<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GuardianRequest;
use App\Models\Guardian;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminGuardianController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/guardian/index');
    }

    public function create()
    {
        return Inertia::render('admin/guardian/create');
    }

    public function store(GuardianRequest $request): RedirectResponse
    {
        $guardian = Guardian::create($request->validated());

        $guardian->students()->sync($request->validated('students'));

        return redirect()->route('#guardian.index')
            ->with('message', 'responsable créé');
    }


    public function show(string $id): Response
    {
        $guardian = Guardian::findOrFail($id);

        return Inertia::render('admin/guardian/show', [
            'guardian' => $guardian
        ]);

    }

    public function edit(string $id): Response
    {
        $guardian = Guardian::findOrFail($id);

        return Inertia::render('admin/guardian/edit', [
            'guardian' => $guardian
        ]);
    }

    public function update(GuardianRequest $request, string $id): RedirectResponse
    {
        $guardian = Guardian::findOrFail($id);

        $guardian->update($request->validated());

        $guardian->students()->sync($request->validated('students'));

        return redirect()->route('#guardian.index')
            ->with('message', 'responsable edité');
    }

    public function destroy(Request $request,  $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $guardian = Guardian::findOrFail($id);

        $guardian->delete();

        return redirect()->route('#guardian.index')
            ->with('message', 'responsable supprimé');

    }
}
