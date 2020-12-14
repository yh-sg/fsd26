import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WineService } from '../wine.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  result
  country

  constructor(private wineSvc:WineService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.country = this.activatedRoute.snapshot.params.country
    this.getCountryR()
  }

  async getCountryR(){
    this.result = await this.wineSvc.getCountry(this.country);
  }

}
