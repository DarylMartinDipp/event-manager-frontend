import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";
import {CreateEventComponent} from "./components/create-event/create-event.component";
import {SignInUserComponent} from "./components/sign-in-user/sign-in-user.component";
import {LayoutComponent} from "./components/layout/layout.component";

const routes: Routes = [
  {path: '', redirectTo: 'signIn', pathMatch: 'full'},
  {path: 'signIn', component: SignInUserComponent},
  {path: '', component: LayoutComponent, children: [
    {path: 'home', component: EventListComponent},
    {path: 'createEvent', component: CreateEventComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }