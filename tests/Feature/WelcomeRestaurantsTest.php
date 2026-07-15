<?php

use App\Models\Restaurant;
use Inertia\Testing\AssertableInertia as Assert;

test('welcome page receives restaurants from the backend', function () {
    Restaurant::factory()->create([
        'name' => 'Punto Norte',
        'category' => 'Hamburguesas',
        'district' => 'Chiclayo',
        'address' => 'Av. Balta 123',
        'keywords' => ['hamburguesa', 'papas', 'carne'],
        'rating' => 4.9,
        'reviews' => 84,
        'price' => 'S/24',
        'distance' => '0.8 km',
        'time' => '7 min',
        'latitude' => -6.7714,
        'longitude' => -79.8409,
        'image' => '/images/foodpoint/categories/hamburguesa.png',
    ]);

    $response = $this->get(route('home'));

    $response->assertInertia(fn (Assert $page) => $page
        ->component('welcome')
        ->has('restaurants', 1, fn (Assert $page) => $page
            ->where('name', 'Punto Norte')
            ->where('category', 'Hamburguesas')
            ->where('district', 'Chiclayo')
            ->where('address', 'Av. Balta 123')
            ->where('keywords.0', 'hamburguesa')
            ->where('rating', 4.9)
            ->where('reviews', 84)
            ->where('price', 'S/24')
            ->where('distance', '0.8 km')
            ->where('time', '7 min')
            ->where('position.0', -6.7714)
            ->where('position.1', -79.8409)
            ->where('image', '/images/foodpoint/categories/hamburguesa.png')
            ->etc()
        )
    );
});
