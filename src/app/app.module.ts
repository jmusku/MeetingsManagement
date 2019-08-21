import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { HeaderComponent } from './header/header.component';
import { MeetingEditComponent } from './meetings/meeting-edit/meeting-edit.component';
import { MeetingDetailComponent } from './meetings/meeting-detail/meeting-detail.component';
import { HomeComponent } from './home/home.component';
import { MeetingListComponent } from './meetings/meeting-list/meeting-list.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library as fontLibrary } from '@fortawesome/fontawesome-svg-core';
import { faCalendar,  faClock } from '@fortawesome/free-regular-svg-icons';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginService } from './login/login.service';
import { TokenInterceptor } from './auth/token.interceptor';

fontLibrary.add(
  faCalendar,
  faClock
);

@NgModule({
  declarations: [
    AppComponent,
    MeetingsComponent,
    HeaderComponent,
    MeetingEditComponent,
    MeetingDetailComponent,
    HomeComponent,
    MeetingListComponent,
    DateTimePickerComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule, 
    AppRoutingModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
