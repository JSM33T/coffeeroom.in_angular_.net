import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { HttpClientModule } from '@angular/common/http';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { SidepanelComponent } from './shared/sidepanel/sidepanel.component';
import { AboutComponent } from './modules/base/about.component';
import { HomeComponent } from './modules/base/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LogoComponent } from './shared/assets/logo';
import { FormsModule } from '@angular/forms';
import { EmailBookingComponent } from './components/shared/emailcta.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    HomeComponent,
    SidepanelComponent,
    FooterComponent,
    LogoComponent,
    EmailBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarModule,
    FormsModule
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
