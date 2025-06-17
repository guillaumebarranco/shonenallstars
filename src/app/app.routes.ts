import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArcadeComponent } from './arcade/arcade.component';
import { AdventureComponent } from './adventure/adventure.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home',
      },
      {
        canActivate: [],
        component: HomeComponent,
        path: 'home',
      },
      {
        canActivate: [],
        component: ArcadeComponent,
        path: 'arcade',
      },
      {
        canActivate: [],
        component: AdventureComponent,
        path: 'adventure',
      },
];
