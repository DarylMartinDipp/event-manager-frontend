import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventListComponent} from "./components/event-list/event-list.component";

const routes: Routes = [
  {path: 'home', component: EventListComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
