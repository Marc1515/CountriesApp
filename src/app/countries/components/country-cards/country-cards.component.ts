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
import ScrollReveal from 'scrollreveal';

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

      // Generar un retraso aleatorio entre 0 y 500ms
      const randomDelay = Math.floor(Math.random() * 500);

      ScrollReveal().reveal(card.nativeElement, {
        distance: '50px',
        duration: 800,
        easing: 'ease-in-out',
        origin: 'bottom',
        reset: false,
        delay: randomDelay,
      });
    });
  }
}
