import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SharedNavbarService } from 'src/app/shared/services/shared-navbar.service';
import { Country } from '../../interfaces/country';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent implements OnInit, OnDestroy {
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
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;

    // Inicializa el estado local con el estado global
    this.isSwitchToggled = this.sharedNavbarService.isSwitchToggled;

    this.switchToggledSubscription =
      this.sharedNavbarService.switchToggled.subscribe((isToggled: boolean) => {
        this.isSwitchToggled = isToggled;
        console.log(
          'ByCapitalPageComponent switch state:',
          this.isSwitchToggled
        );
      });
  }

  searchByCapital(term: string): void {
    this.isLoading = true;

    this.countriesService.searchCapital(term).subscribe((countries) => {
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
