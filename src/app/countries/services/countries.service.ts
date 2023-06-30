import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';

import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})

export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1"

  constructor(private http: HttpClient) { }


  getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError( () => of([]) ),
      )
  }


  searchCountryByAlphaCode( code: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.getCountriesRequest(url)

  }

  searchCapital( term: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${ term }`;

    return this.getCountriesRequest(url)
  }

  searchCountry( term: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${ term }`;

    return this.getCountriesRequest(url)

  }

  searchRegion( region: string ): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${ region }`;

    return this.getCountriesRequest(url)

  }

}
