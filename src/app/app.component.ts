import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'countryApp';
  isScreenLarge: boolean;

  constructor() {
    this.isScreenLarge = window.innerWidth > 1024;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isScreenLarge = window.innerWidth > 1024;
  }
}
