import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedNavbarService {
  public isNavbarVisibleService: boolean = true;

  constructor() {}

  navbarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  sidebarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  tagClicked: EventEmitter<string> = new EventEmitter<string>();
  switchToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
}
