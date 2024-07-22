import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedNavbarService } from '../../services/shared-navbar.service';
import { Subscription, delay, of } from 'rxjs';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public isSidebarVisible: boolean = true;
  private sidebarToggledSubscription!: Subscription;

  constructor(private sharedNavbarService: SharedNavbarService) {}

  ngOnInit() {
    this.sidebarToggledSubscription =
      this.sharedNavbarService.navbarToggled.subscribe((isOpen: boolean) => {
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
        this.sharedNavbarService.tagClicked.emit();
        this.sharedNavbarService.navbarToggled.emit();
      });
  }

  ngOnDestroy() {
    if (this.sidebarToggledSubscription) {
      this.sidebarToggledSubscription.unsubscribe();
    }
  }
}
