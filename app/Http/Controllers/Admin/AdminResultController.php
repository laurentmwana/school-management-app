<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResultRequest;
use App\Models\Result;
use App\Services\Upload\FileUploadAction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminResultController extends Controller
{
    private const DIR_FILE = "results";

    public function __construct(private FileUploadAction $upload)
    {
    }

    public function index(): Response
    {
        return Inertia::render('admin/result/index');
    }

    public function create()
    {
        return Inertia::render('admin/result/create');
    }

    public function store(ResultRequest $request): RedirectResponse
    {
        $newFile = $this->upload->handle(self::DIR_FILE, $request->validated('file'));

        Result::create([
            ...$request->validated(),
            'file' => $newFile
        ]);

        return redirect()->route('#result.index')
            ->with('message', 'résultat créé');
    }


    public function show(string $id): Response
    {
        $result = Result::findOrFail($id);

        return Inertia::render('admin/result/show', [
            'result' => $result
        ]);

    }

    public function edit(string $id): Response
    {
        $result = Result::findOrFail($id);

        return Inertia::render('admin/result/edit', [
            'student' => $result
        ]);
    }

    public function update(ResultRequest $request, string $id): RedirectResponse
    {
        $result = Result::findOrFail($id);

        $newFile = $this->upload->handle(
            self::DIR_FILE,
            $request->validated('file'),
            $result->file
        );

        $result->update([
            ...$request->validated(),
            'file' => $newFile
        ]);

        return redirect()->route('#result.index')
            ->with('message', 'résultat edité');
    }

    public function destroy(Request $request,  $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $result = Result::findOrFail($id);

        $result->delete();

        return redirect()->route('#result.index')
            ->with('message', 'résultat supprimé');

    }
}
