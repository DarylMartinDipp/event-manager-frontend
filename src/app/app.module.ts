import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TopBarComponent} from "./components/top-bar/top-bar.component";
import {HttpClientModule} from "@angular/common/http";
import {CategoryService} from "./services/category.service";
import {UserService} from "./services/user.service";
import {EventService} from "./services/event.service";
import {EventListComponent} from "./components/event-list/event-list.component";
import {EventListItemComponent} from "./components/event-list-item/event-list-item.component";
import {CreateEventComponent} from "./components/create-event/create-event.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EventListComponent,
    EventListItemComponent,
    CreateEventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CategoryService,
    UserService,
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }