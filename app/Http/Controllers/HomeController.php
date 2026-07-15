<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): Response
    {
        return Inertia::render('welcome', [
            'restaurants' => Restaurant::query()
                ->oldest('name')
                ->get()
                ->map(fn (Restaurant $restaurant): array => [
                    'id' => $restaurant->id,
                    'name' => $restaurant->name,
                    'category' => $restaurant->category,
                    'district' => $restaurant->district,
                    'address' => $restaurant->address,
                    'keywords' => $restaurant->keywords,
                    'rating' => (float) $restaurant->rating,
                    'reviews' => $restaurant->reviews,
                    'price' => $restaurant->price,
                    'distance' => $restaurant->distance,
                    'time' => $restaurant->time,
                    'position' => [
                        (float) $restaurant->latitude,
                        (float) $restaurant->longitude,
                    ],
                    'image' => $restaurant->image,
                ]),
        ]);
    }
}
