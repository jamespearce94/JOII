import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { HeaderModule } from './shared/header/header.module';

const dbConfig: DBConfig  = {
  name: 'preferencesDb',
  version: 1,
  objectStoresMeta: [{
    store: 'favourites',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'movie_id', keypath: 'movie_id', options: { unique: true } },
    ]
  }]
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    HttpClientModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
