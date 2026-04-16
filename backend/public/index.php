<?php

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Support two layouts:
//   1. Standard Laravel: public/index.php with vendor/ one level up (Docker/local)
//   2. Flat deployment:  index.php alongside vendor/ in the same folder (cPanel/shared hosting)
$base = file_exists(__DIR__.'/vendor/autoload.php') ? __DIR__ : dirname(__DIR__);

// Determine if the app is in maintenance mode
if (file_exists($maintenance = $base.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader
require $base.'/vendor/autoload.php';

// Bootstrap Laravel and handle the request
$app = require_once $base.'/bootstrap/app.php';

/** @var \Illuminate\Foundation\Application $app */
$kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = Request::capture()
);

$response->send();

$kernel->terminate($request, $response);
