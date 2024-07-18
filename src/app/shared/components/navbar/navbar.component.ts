import { Component, HostListener } from '@angular/core';
import { SharedSidebarService } from '../../services/shared-sidebar.service';
import { delay, of, Subscription } from 'rxjs';

@Component({
  selector: 'shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public isSidebarVisible: boolean = true;
  private sidebarToggledSubscription!: Subscription;

  constructor(private sharedSidebarService: SharedSidebarService) {}

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
