import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SharedNavbarService } from '../../services/shared-navbar.service';
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isSidebarVisible: boolean = true;
  public isSwitchToggled: boolean = false;
  private sidebarToggledSubscription!: Subscription;
  private switchToggledSubscription!: Subscription;

  isScreenLarge: boolean = window.innerWidth > 1024;

  constructor(private sharedNavbarService: SharedNavbarService) {}

  ngOnInit() {
    this.switchToggledSubscription =
      this.sharedNavbarService.switchToggled.subscribe((isToggled: boolean) => {
        this.isSwitchToggled = isToggled;
        console.log('Switch state in Navbar:', this.isSwitchToggled);
      });

    // Inicializa la variable isScreenLarge al iniciar el componente
    this.updateScreenSize();
  }

  sectionClicked() {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => {
        this.sharedNavbarService.tagClicked.emit();
      });
  }

  ngOnDestroy() {
    if (this.sidebarToggledSubscription) {
      this.sidebarToggledSubscription.unsubscribe();
    }
    if (this.switchToggledSubscription) {
      this.switchToggledSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    const navbarList = document.querySelector('.navbar__list') as HTMLElement;
    const logoContainer = document.querySelector(
      '.logo-container'
    ) as HTMLElement;
    const logoTitle = document.querySelector('.navbar__title') as HTMLElement;
    const buttons = document.querySelectorAll('.navbar__item button');

    if (window.pageYOffset > 100) {
      navbar.classList.add('navbar--scrolled');
      navbarList.classList.add('navbar__list--scrolled');
      logoContainer.classList.add('logo-container--scrolled');
      logoTitle.classList.add('navbar_title--scrolled');
      buttons.forEach((button) => button.classList.add('button--scrolled'));
    } else {
      navbar.classList.remove('navbar--scrolled');
      navbarList.classList.remove('navbar__list--scrolled');
      logoContainer.classList.remove('logo-container--scrolled');
      logoTitle.classList.remove('navbar_title--scrolled');
      buttons.forEach((button) => button.classList.remove('button--scrolled'));
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateScreenSize();
  }

  private updateScreenSize() {
    this.isScreenLarge = window.innerWidth < 1024;
  }
}
