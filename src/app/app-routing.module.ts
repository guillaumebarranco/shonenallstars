import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdventureComponent } from './adventure/adventure.component';
import { ArcadeComponent } from './arcade/arcade.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
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

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
      useHash: true,
    }),
  ],
})
export class AppRoutingModule {}
