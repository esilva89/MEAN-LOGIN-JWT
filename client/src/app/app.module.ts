// External Modules.
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxSmartModalModule } from 'ngx-smart-modal';

// External Services.
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSmartModalService } from 'ngx-smart-modal';

// My Components.
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginComponent } from './components/user/login/login.component';
import { PasswordComponent } from './components/user/password/password.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';

// My Directives.
import { MatchPasswordDirective } from './directives/match-password.directive';

// My Interceptors.
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CustomModalComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    PasswordComponent,
    Page404Component,
    MatchPasswordDirective
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FlashMessagesModule,
    FormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
    FlashMessagesService,
    NgxSmartModalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
