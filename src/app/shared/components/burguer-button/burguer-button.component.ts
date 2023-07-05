import { Component } from '@angular/core';

import { SharedSidebarService } from '../../services/shared-sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'burguer-button',
  templateUrl: './burguer-button.component.html',
  styleUrls: ['./burguer-button.component.css']
})
export class BurguerButtonComponent {


  public isOpen: boolean = false;
  public isLightBackground: boolean = false;
  private tagClickedSubscription: Subscription;

  constructor(private sharedSidebarService: SharedSidebarService) {

    this.tagClickedSubscription = this.sharedSidebarService.tagClicked.subscribe((tag: string) => {
      // Ejecutar la lógica deseada cuando se hace clic en un botón del historial de búsquedas
      this.isOpen = false;
      this.isLightBackground = false;
    });

  }

  toggleMenu() {
    if (this.sharedSidebarService.isSidebarVisibleService) {
      this.isOpen = !this.isOpen;
      this.isLightBackground = !this.isLightBackground;
      this.sharedSidebarService.sidebarToggled.emit(this.isOpen);
    }
  }

}
