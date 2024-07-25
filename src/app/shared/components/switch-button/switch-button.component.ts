import { Component } from '@angular/core';
import { SharedNavbarService } from '../../services/shared-navbar.service';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.css'],
})
export class SwitchButtonComponent {
  constructor(private sharedNavbarService: SharedNavbarService) {}

  toggleSwitch() {
    this.sharedNavbarService.toggleSwitch();
  }
}
