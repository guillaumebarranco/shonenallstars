import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { StoreEnhancer } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import { PersistConfig } from 'redux-persist/lib/types';
import { createFilter } from 'redux-persist-transform-filter';
import sessionStorage from 'redux-persist/lib/storage/session';

import { IAppState, rootReducer, initialState } from './store';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AdventureComponent } from './adventure/adventure.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { ArcadeModule } from './arcade/arcade.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgReduxModule,
    AppRoutingModule,
    ArcadeModule,
  ],
  declarations: [
    AppComponent,
    AdventureComponent,
    HomeComponent,
  ],
  providers: [
    { provide: 'sessionStorageFromReduxPersist', useValue: sessionStorage}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    @Inject('sessionStorageFromReduxPersist') private storage: Storage,
  ) {
    this.configureStore();
  }

  private configureStore() {
    const enhancers: StoreEnhancer<IAppState>[] = [];

    if(this.devTools.isEnabled()) {
      enhancers.push(this.devTools.enhancer());
    }

    const persistConfig: PersistConfig = {
      key: 'root',
      storage: this.storage,
      transforms: [],
      whitelist: [],
      // stateReconciler: deep
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const middlewares = environment.production ? [] : [createLogger()];

    this.ngRedux.configureStore(
      persistedReducer,
      initialState,
      middlewares,
      enhancers,
    );

    persistStore(this.ngRedux);
  }
}
