import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { SidepanelComponent } from './shared/sidepanel/sidepanel.component';
import { AboutComponent } from './modules/base/about.component';
import { HomeComponent } from './modules/base/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LogoComponent } from './shared/assets/logo.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './modules/base/contact.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { FaqComponent } from './modules/base/faq.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AmbienceComponent } from './shared/ambience/ambience.component';
import { TestComponent } from './modules/test/test/test.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, ContactComponent, AboutComponent, HomeComponent, SidepanelComponent, FaqComponent, FooterComponent, LogoComponent, AmbienceComponent, TestComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        LoadingBarModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
