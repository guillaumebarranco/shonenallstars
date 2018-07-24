import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ArcadeComponent } from './arcade/arcade.component';
import { AdventureComponent } from './adventure/adventure.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [],
  },
  {
    path: 'arcade',
    component: ArcadeComponent,
    canActivate: [],
  },
  {
    path: 'adventure',
    component: AdventureComponent,
    canActivate: [],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      enableTracing: false,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
