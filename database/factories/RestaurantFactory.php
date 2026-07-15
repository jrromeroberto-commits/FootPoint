<?php

namespace Database\Factories;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Restaurant>
 */
class RestaurantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'category' => fake()->randomElement([
                'Cafeteria',
                'Hamburguesas',
                'Pastas',
                'Polleria',
                'Sushi',
            ]),
            'district' => fake()->city(),
            'address' => fake()->streetAddress(),
            'keywords' => fake()->randomElements([
                'cafe',
                'hamburguesa',
                'pastas',
                'pizza',
                'pollo',
                'postres',
                'sushi',
            ], 3),
            'rating' => fake()->randomFloat(1, 3.8, 5.0),
            'reviews' => fake()->numberBetween(20, 1500),
            'price' => 'S/'.fake()->numberBetween(18, 65),
            'distance' => fake()->randomFloat(1, 0.4, 4.5).' km',
            'time' => fake()->numberBetween(5, 25).' min',
            'latitude' => fake()->latitude(-12.16, -12.08),
            'longitude' => fake()->longitude(-77.08, -77.00),
            'image' => '/images/foodpoint/categories/'.fake()->randomElement([
                'cafeteria.png',
                'hamburguesa.png',
                'pastas.png',
                'polleria.png',
                'sushi.png',
            ]),
        ];
    }
}
