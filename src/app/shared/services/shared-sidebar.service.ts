import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedSidebarService {

  public isSidebarVisibleService: boolean = true;

  constructor() { }

  sidebarToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  tagClicked: EventEmitter<string> = new EventEmitter<string>();

}
