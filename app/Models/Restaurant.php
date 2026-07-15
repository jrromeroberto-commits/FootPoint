<?php

namespace App\Models;

use Database\Factories\RestaurantFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property string $name
 * @property string $category
 * @property string $district
 * @property string|null $address
 * @property array<int, string> $keywords
 * @property string $rating
 * @property int $reviews
 * @property string $price
 * @property string $distance
 * @property string $time
 * @property string $latitude
 * @property string $longitude
 * @property string $image
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
#[Fillable([
    'name',
    'category',
    'district',
    'address',
    'keywords',
    'rating',
    'reviews',
    'price',
    'distance',
    'time',
    'latitude',
    'longitude',
    'image',
])]
class Restaurant extends Model
{
    /** @use HasFactory<RestaurantFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'keywords' => 'array',
            'reviews' => 'integer',
        ];
    }
}
