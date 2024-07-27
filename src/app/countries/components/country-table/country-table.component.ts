import {
  Component,
  Input,
  HostListener,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { Country } from '../../interfaces/country';
import ScrollReveal from 'scrollreveal';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
})
export class CountryTableComponent implements AfterViewInit {
  showButton = false;

  @Input()
  public countries: Country[] = [];

  @ViewChildren('countryRow') rows: QueryList<ElementRef> = new QueryList();

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
    this.rows.forEach((row: ElementRef, index: number) => {
      const delay = index * 100;

      ScrollReveal().reveal(row.nativeElement, {
        distance: '50px',
        duration: 800,
        easing: 'ease-in-out',
        origin: 'bottom',
        reset: false,
        delay: delay,
      });
    });
  }
}
