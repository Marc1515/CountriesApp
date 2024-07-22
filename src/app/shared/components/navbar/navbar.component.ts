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

  constructor(
    private sharedSidebarService: SharedNavbarService,
    private sharedNavbarService: SharedNavbarService
  ) {}

  ngOnInit() {
    this.sidebarToggledSubscription =
      this.sharedSidebarService.sidebarToggled.subscribe((isOpen: boolean) => {
        this.isSidebarVisible = !isOpen;
        if (this.isSidebarVisible) {
          document.body.style.overflow = 'auto';
        } else {
          document.body.style.overflow = 'hidden';
        }
      });

    this.switchToggledSubscription =
      this.sharedNavbarService.switchToggled.subscribe((isToggled: boolean) => {
        this.isSwitchToggled = isToggled;
        console.log('Switch state in Navbar:', this.isSwitchToggled);
      });
  }

  sectionClicked() {
    of(null)
      .pipe(delay(1000))
      .subscribe(() => {
        this.sharedSidebarService.tagClicked.emit();
        this.sharedSidebarService.sidebarToggled.emit();
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
    const buttons = document.querySelectorAll('.navbar__item button');

    if (window.pageYOffset > 100) {
      navbar.classList.add('navbar--scrolled');
      navbarList.classList.add('navbar__list--scrolled');
      buttons.forEach((button) => button.classList.add('button--scrolled'));
    } else {
      navbar.classList.remove('navbar--scrolled');
      navbarList.classList.remove('navbar__list--scrolled');
      buttons.forEach((button) => button.classList.remove('button--scrolled'));
    }
  }
}
