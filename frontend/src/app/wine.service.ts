import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class WineService{
    constructor(private http:HttpClient){}

    async getAllCountries(): Promise<any[]>{
        const res = await this.http.get<any>('http://localhost:3000/countries')
            .toPromise()
        console.log(res);
        return res
    }

    async getCountry(country): Promise<any[]>{
        const res = await this.http.get<any>(`http://localhost:3000/country/${country}`)
            .toPromise()
        console.log(res);
        return res as []
    }
}