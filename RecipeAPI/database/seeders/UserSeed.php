<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'user1',
            'firstname' => 'John',
            'lastname' => 'Doe',
            'email' => 'john.doe@example.com',
            'password' => Hash::make('password1'),
        ]);

        User::create([
            'username' => 'user2',
            'firstname' => 'Jane',
            'lastname' => 'Smith',
            'email' => 'jane.smith@example.com',
            'password' => Hash::make('password2'),
        ]);

        User::create([
            'username' => 'user3',
            'firstname' => 'Michael',
            'lastname' => 'Johnson',
            'email' => 'michael.johnson@example.com',
            'password' => Hash::make('password3'),
        ]);

        User::create([
            'username' => 'user4',
            'firstname' => 'Emily',
            'lastname' => 'Williams',
            'email' => 'emily.williams@example.com',
            'password' => Hash::make('password4'),
        ]);

        User::create([
            'username' => 'user5',
            'firstname' => 'Christopher',
            'lastname' => 'Brown',
            'email' => 'christopher.brown@example.com',
            'password' => Hash::make('password5'),
        ]);

        User::create([
            'username' => 'user6',
            'firstname' => 'Jessica',
            'lastname' => 'Jones',
            'email' => 'jessica.jones@example.com',
            'password' => Hash::make('password6'),
        ]);

        User::create([
            'username' => 'user7',
            'firstname' => 'Matthew',
            'lastname' => 'Davis',
            'email' => 'matthew.davis@example.com',
            'password' => Hash::make('password7'),
        ]);

        User::create([
            'username' => 'user8',
            'firstname' => 'Amanda',
            'lastname' => 'Martinez',
            'email' => 'amanda.martinez@example.com',
            'password' => Hash::make('password8'),
        ]);

        User::create([
            'username' => 'user9',
            'firstname' => 'David',
            'lastname' => 'Miller',
            'email' => 'david.miller@example.com',
            'password' => Hash::make('password9'),
        ]);

        User::create([
            'username' => 'user10',
            'firstname' => 'Sarah',
            'lastname' => 'Anderson',
            'email' => 'sarah.anderson@example.com',
            'password' => Hash::make('password10'),
        ]);
    }
}
