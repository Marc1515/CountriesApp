import { Component } from '@angular/core';
import { SharedNavbarService } from '../../services/shared-navbar.service';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.css'],
})
export class SwitchButtonComponent {
  public isToggled: boolean = false;

  constructor(private sharedNavbarService: SharedNavbarService) {}

  toggleSwitch() {
    this.isToggled = !this.isToggled;
    console.log('Switch toggled:', this.isToggled);
    this.sharedNavbarService.switchToggled.emit(this.isToggled);
  }
}
