import { Component } from '@angular/core';

import { SharedSidebarService } from '../../services/shared-sidebar.service';

@Component({
  selector: 'burguer-button',
  templateUrl: './burguer-button.component.html',
  styleUrls: ['./burguer-button.component.css']
})
export class BurguerButtonComponent {


  public isOpen: boolean = false;
  public isLightBackground: boolean = false;

  constructor(private sharedSidebarService: SharedSidebarService) {}

  toggleMenu() {
    if (this.sharedSidebarService.isSidebarVisibleService) {
      this.isOpen = !this.isOpen;
      this.isLightBackground = !this.isLightBackground;
      this.sharedSidebarService.sidebarToggled.emit(this.isOpen);
    }
  }

}
