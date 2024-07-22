import { Component } from '@angular/core';

import { SharedNavbarService } from '../../services/shared-navbar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'burguer-button',
  templateUrl: './burguer-button.component.html',
  styleUrls: ['./burguer-button.component.css'],
})
export class BurguerButtonComponent {
  public isOpen: boolean = false;
  public isLightBackground: boolean = false;
  private tagClickedSubscription: Subscription;

  constructor(private sharedNavbarService: SharedNavbarService) {
    this.tagClickedSubscription = this.sharedNavbarService.tagClicked.subscribe(
      (tag: string) => {
        // Ejecutar la lógica deseada cuando se hace clic en un botón del historial de búsquedas
        this.isOpen = false;
        this.isLightBackground = false;
      }
    );
  }

  toggleMenu() {
    if (this.sharedNavbarService.isNavbarVisibleService) {
      this.isOpen = !this.isOpen;
      this.isLightBackground = !this.isLightBackground;
      this.sharedNavbarService.navbarToggled.emit(this.isOpen);
    }
  }
}
