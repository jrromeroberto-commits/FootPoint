<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        collect([
            [
                'name' => 'Sakana Sushi Bar',
                'category' => 'Sushi',
                'district' => 'Miraflores',
                'address' => 'Av. Jose Larco 812',
                'keywords' => ['sushi', 'makis', 'ramen', 'japonesa', 'pescado'],
                'rating' => 4.7,
                'reviews' => 512,
                'price' => 'S/45',
                'distance' => '2.1 km',
                'time' => '12 min',
                'latitude' => -12.1211,
                'longitude' => -77.0305,
                'image' => '/images/foodpoint/categories/sushi.png',
            ],
            [
                'name' => 'La Brasa Roja',
                'category' => 'Polleria',
                'district' => 'Surquillo',
                'address' => 'Av. Angamos Este 1550',
                'keywords' => ['pollo', 'pollo a la brasa', 'papas', 'parrilla'],
                'rating' => 4.5,
                'reviews' => 1241,
                'price' => 'S/28',
                'distance' => '1.6 km',
                'time' => '8 min',
                'latitude' => -12.1254,
                'longitude' => -77.0248,
                'image' => '/images/foodpoint/categories/polleria.png',
            ],
            [
                'name' => 'Cafe Aurora',
                'category' => 'Cafeteria',
                'district' => 'San Isidro',
                'address' => 'Calle Los Libertadores 340',
                'keywords' => ['cafe', 'cafeteria', 'postres', 'sandwiches'],
                'rating' => 4.8,
                'reviews' => 389,
                'price' => 'S/22',
                'distance' => '1.2 km',
                'time' => '6 min',
                'latitude' => -12.1192,
                'longitude' => -77.0361,
                'image' => '/images/foodpoint/categories/cafeteria.png',
            ],
            [
                'name' => 'Pasta Lima',
                'category' => 'Pastas',
                'district' => 'Miraflores',
                'address' => 'Av. 28 de Julio 535',
                'keywords' => ['pasta', 'pastas', 'italiana', 'pizza'],
                'rating' => 4.6,
                'reviews' => 724,
                'price' => 'S/35',
                'distance' => '1.9 km',
                'time' => '10 min',
                'latitude' => -12.1148,
                'longitude' => -77.0301,
                'image' => '/images/foodpoint/categories/pastas.png',
            ],
        ])->each(function (array $restaurant): void {
            Restaurant::query()->updateOrCreate(
                ['name' => $restaurant['name']],
                $restaurant,
            );
        });
    }
}
