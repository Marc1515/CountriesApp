import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country, Languages, Currencies } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  public country?: Country[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) =>
          this.countriesService.searchCountryByAlphaCode(id)
        )
      )
      .subscribe((country) => {
        if (!country || country.length === 0) {
          this.router.navigateByUrl('');
        } else {
          this.country = country;
        }
      });
  }

  getFirstLanguage(languages: Languages): string {
    const languageKeys = Object.keys(languages);
    return languageKeys.length > 0 ? languages[languageKeys[0]] || '' : '';
  }

  getFirstCurrency(currencies: Currencies): string {
    const currencyKeys = Object.keys(currencies);
    return currencyKeys.length > 0 ? currencies[currencyKeys[0]].name : '';
  }

  searchCountry(code: string) {
    this.countriesService
      .searchCountryByAlphaCode(code)
      .subscribe((country) => {
        console.log(country);
      });
  }
}
