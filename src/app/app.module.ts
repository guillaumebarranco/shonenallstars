import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreEnhancer } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { PersistConfig } from 'redux-persist/lib/types';

import { environment } from '../environments/environment';
import { AdventureComponent } from './adventure/adventure.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArcadeModule } from './arcade/arcade.module';
import { HomeComponent } from './home/home.component';
import { IAppState, initialState, rootReducer } from './store';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, AdventureComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgReduxModule,
    AppRoutingModule,
    ArcadeModule,
  ],
  providers: [
    { provide: 'sessionStorageFromReduxPersist', useValue: sessionStorage },
  ],
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTools: DevToolsExtension,
    @Inject('sessionStorageFromReduxPersist') private storage: Storage
  ) {
    this.configureStore();
  }

  private configureStore() {
    const enhancers: StoreEnhancer<IAppState>[] = [];

    if (this.devTools.isEnabled()) {
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
      enhancers
    );

    persistStore(this.ngRedux);
  }
}
