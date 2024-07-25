import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedNavbarService {
  public isNavbarVisibleService: boolean = true;
  public isSwitchToggled: boolean = false;

  constructor() {}

  navbarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  tagClicked: EventEmitter<string> = new EventEmitter<string>();
  switchToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggleSwitch() {
    this.isSwitchToggled = !this.isSwitchToggled;
    this.switchToggled.emit(this.isSwitchToggled);
  }
}
