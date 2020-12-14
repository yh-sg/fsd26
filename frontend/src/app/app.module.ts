import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CountriesComponent } from './components/countries.component';
import { RouterModule } from '@angular/router';
import { WineService } from './wine.service';
import { CountryComponent } from './components/country.component';

const ROUTES = [
  { path: '', component: CountriesComponent },
  { path:'country/:country', component: CountryComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [WineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
