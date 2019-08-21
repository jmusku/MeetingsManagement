import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingsComponent } from './meetings/meetings.component';
import { MeetingEditComponent } from './meetings/meeting-edit/meeting-edit.component';
import { MeetingDetailComponent } from './meetings/meeting-detail/meeting-detail.component';
import { HomeComponent } from './home/home.component';
import { MeetingListComponent } from './meetings/meeting-list/meeting-list.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent},
  { path: 'meetings', component: MeetingsComponent, children: [
    { path: '', component: MeetingListComponent },
    { path: 'new', component: MeetingEditComponent },
    { path: ':id', component: MeetingDetailComponent },
    { path: ':id/edit', component: MeetingEditComponent },
  ] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
