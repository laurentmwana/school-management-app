<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Year;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminYearController extends Controller
{

    public function index()
    {
        return Inertia::render('admin/year/index');
    }

    public function store(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $year = Year::findOrFail($id);

        $this->createNewYear($year);

        return redirect()->route('#school.index')
            ->with('message', 'école supprimée');

    }


    public function show(string $id): Response
    {
        $year = Year::findOrFail($id);

        return Inertia::render('admin/year/show', [
            'year' => $year
        ]);

    }


    private function createNewYear(Year $year): Year
    {
        [$nameYear, $start, $end] = $this->getYearName($year);

        $existingYear = Year::where('name', $nameYear)->first();

        if ($existingYear) {
            throw new \Exception("L'année académique $nameYear existe déjà.");
        }

        $newYear =  Year::create([
            'start' => $start,
            'end'   => $end,
            'name'  => $nameYear,
        ]);

        return $newYear;
    }

    private function getYearName(Year $year): array
    {
        $start = $year->end;
        $end = $year->end + 1;

        return [
            "{$start}-{$end}",
            $start,
            $end,
        ];
    }
}
