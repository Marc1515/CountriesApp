import { Component, OnInit, OnDestroy } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { SharedNavbarService } from 'src/app/shared/services/shared-navbar.service';
import { Subscription } from 'rxjs';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent implements OnInit, OnDestroy {
  public countries: Country[] = [];
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public selectedRegion?: Region;
  public isSwitchToggled: boolean = false;
  private switchToggledSubscription!: Subscription;

  constructor(
    private countriesService: CountriesService,
    private sharedNavbarService: SharedNavbarService
  ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;

    this.switchToggledSubscription =
      this.sharedNavbarService.switchToggled.subscribe((isToggled: boolean) => {
        this.isSwitchToggled = isToggled;
        console.log(
          'ByRegionPageComponent switch state:',
          this.isSwitchToggled
        );
      });
  }

  searchByRegion(region: Region): void {
    this.selectedRegion = region;

    this.countriesService.searchRegion(region).subscribe((countries) => {
      this.countries = countries;
    });
  }

  ngOnDestroy(): void {
    if (this.switchToggledSubscription) {
      this.switchToggledSubscription.unsubscribe();
    }
  }
}
