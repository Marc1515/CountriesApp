import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BurguerButtonComponent } from './components/burguer-button/burguer-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { SwitchButtonComponent } from './components/switch-button/switch-button.component';

@NgModule({
  declarations: [
    HomePageComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent,
    BurguerButtonComponent,
    NavbarComponent,
    SwitchButtonComponent,
  ],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [
    HomePageComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
    SidebarComponent,
    BurguerButtonComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
