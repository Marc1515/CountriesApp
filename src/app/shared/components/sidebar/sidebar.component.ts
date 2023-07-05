import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedSidebarService } from '../../services/shared-sidebar.service';
import { Subscription, delay, of } from 'rxjs';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public isSidebarVisible: boolean = true;
  private sidebarToggledSubscription!: Subscription;

  constructor(private sharedSidebarService: SharedSidebarService) {}

  ngOnInit() {
    this.sidebarToggledSubscription = this.sharedSidebarService.sidebarToggled.subscribe((isOpen: boolean) => {
      this.isSidebarVisible = !isOpen;
      if(this.isSidebarVisible) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }

    });
  }

  sectionClicked() {
    of(null).pipe(
      delay(1000)
    ).subscribe(() => {
      this.sharedSidebarService.tagClicked.emit();
      this.sharedSidebarService.sidebarToggled.emit();
    })
  }

  ngOnDestroy() {
    if(this.sidebarToggledSubscription) {
      this.sidebarToggledSubscription.unsubscribe();
    }
  }
}
