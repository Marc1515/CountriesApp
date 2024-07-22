import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
  Input,
} from '@angular/core';
import { Country } from '../../interfaces/country';
import VanillaTilt from 'vanilla-tilt';

@Component({
  selector: 'country-cards',
  templateUrl: './country-cards.component.html',
  styleUrls: ['./country-cards.component.css'],
})
export class CountryCardsComponent implements AfterViewInit {
  showButton = false;

  @Input()
  public countries: Country[] = [];

  @ViewChildren('card') cards: QueryList<ElementRef> = new QueryList();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngAfterViewInit() {
    this.cards.forEach((card: ElementRef) => {
      VanillaTilt.init(card.nativeElement, {
        max: 25,
        speed: 400,
        glare: true,
        'max-glare': 0.5,
      });
    });
  }
}
