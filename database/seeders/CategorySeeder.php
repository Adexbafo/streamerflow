<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [

            [
                'name' => 'Gaming',
                'description' => 'Gaming streams and esports content.',
            ],

            [
                'name' => 'Music',
                'description' => 'Music videos, performances, and live sessions.',
            ],

            [
                'name' => 'Sports',
                'description' => 'Sports highlights and live sports discussions.',
            ],

            [
                'name' => 'Entertainment',
                'description' => 'General entertainment and trending content.',
            ],

            [
                'name' => 'News',
                'description' => 'Regional and global news content.',
            ],

            [
                'name' => 'Education',
                'description' => 'Educational tutorials and learning streams.',
            ],

            [
                'name' => 'Regional Culture',
                'description' => 'Local traditions, culture, and regional experiences.',
            ],

        ];

        foreach ($categories as $category) {

            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'is_active' => true,
            ]);

        }
    }
}