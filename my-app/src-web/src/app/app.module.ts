import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient, HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';


import { UserLoginService } from './services/userLogin.service';
import { HttpService } from './services/http.service';
import { NotificationService } from './services/notification.service';


 const routes: Routes = [
  {
    path : '', redirectTo : '/index', pathMatch : 'full'
  },
  {
    path : 'index' , component: AppComponent
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( routes , { enableTracing: false })
  ],
  providers: [
    UserLoginService,
    HttpService,
    HttpClientModule,
    NotificationService

  ],
  exports: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
