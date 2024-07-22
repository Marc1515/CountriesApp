import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'country-cards',
  templateUrl: './country-cards.component.html',
  styleUrls: ['./country-cards.component.css'],
})
export class CountryCardsComponent {
  @Input() countries: Country[] = [];
}
