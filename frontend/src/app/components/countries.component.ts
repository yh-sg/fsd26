import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  countries = []

  constructor(private wineSvc:WineService, private router:Router) { }

  ngOnInit(): void {
    this.getCountries();
  }

  async getCountries(){
    this.countries = await this.wineSvc.getAllCountries(); 
  } 

  getCountry(countryName){
    this.router.navigate([`/country/`,countryName]);
  }
}