import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { SignupComponent } from './signup/signup.component';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { SocialAuthService } from 'angularx-social-login';

const routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
];

@NgModule({
    declarations: [LoginComponent, HomeComponent, SignupComponent],
    imports: [FormsModule,CommonModule,RouterModule.forChild(routes),SocialLoginModule,GoogleSigninButtonModule],
    providers: [
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider('881148390473-rodjtppcckgpft8guo2bkttnlcg5gmb2.apps.googleusercontent.com')
              }
            ]
          } as SocialAuthServiceConfig,
        },
        SocialAuthService
      ],
})
export class AuthModule {}
