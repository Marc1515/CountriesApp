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
  isLargeScreen = window.innerWidth > 765;

  @Input()
  public countries: Country[] = [];

  @ViewChildren('card') cards: QueryList<ElementRef> = new QueryList();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.pageYOffset > 100;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isLargeScreen = window.innerWidth > 765;
    this.toggleTiltEffect();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  ngAfterViewInit() {
    this.toggleTiltEffect();
  }

  private toggleTiltEffect() {
    if (this.isLargeScreen) {
      this.cards.forEach((card: ElementRef) => {
        VanillaTilt.init(card.nativeElement, {
          max: 25,
          speed: 400,
          glare: true,
          'max-glare': 0.5,
        });

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
    } else {
      // Reset VanillaTilt for each card if screen size is less than or equal to 765
      this.cards.forEach((card: ElementRef) => {
        VanillaTilt.init(card.nativeElement);
        const tilt = card.nativeElement.vanillaTilt;
        if (tilt) {
          tilt.destroy();
        }
      });
    }
  }
}
