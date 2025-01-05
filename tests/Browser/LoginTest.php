<?php

use Illuminate\Support\Sleep;
use Laravel\Dusk\Browser;

test('login test', function () {
    $this->browse(function (Browser $browser) {
        $browser->visit('/login')
            ->type('email', 'vijakidur@example.com')
            ->type('password', 'password')
            ->press('login')
            ->waitForLocation('/dashboard')
            ->assertPathIs('/dashboard')
            ->assertSee('Acme Inc')
            ->assertDataAttribute('div.text-sidebar-foreground', 'state', 'expanded')
            ->press('sidebar-trigger')
            ->assertDataAttribute('div.text-sidebar-foreground', 'state', 'collapsed')
            ->press('sidebar-trigger')
            ->assertDataAttribute('div.text-sidebar-foreground', 'state', 'expanded')
            ->assertSee('Building Your Application');
    });
});
