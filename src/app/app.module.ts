import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
// import { HomeComponentComponent } from './home-component/home-component.component';
import { HomeComponent } from './home/home.component';
// import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { VoteComponent } from './vote/vote.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
