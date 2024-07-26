import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SharedNavbarService } from 'src/app/shared/services/shared-navbar.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['by-country-page.component.css'],
})
export class ByCountryPageComponent implements OnInit, OnDestroy {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';
  public isSwitchToggled: boolean = false;
  private switchToggledSubscription!: Subscription;

  constructor(
    private countriesService: CountriesService,
    private sharedNavbarService: SharedNavbarService
  ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;

    // Inicializa el estado local con el estado global
    this.isSwitchToggled = this.sharedNavbarService.isSwitchToggled;

    this.switchToggledSubscription =
      this.sharedNavbarService.switchToggled.subscribe((isToggled: boolean) => {
        this.isSwitchToggled = isToggled;
        console.log(
          'ByCountryPageComponent switch state:',
          this.isSwitchToggled
        );
      });
  }

  searchByCountry(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCountry(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.switchToggledSubscription) {
      this.switchToggledSubscription.unsubscribe();
    }
  }
}
