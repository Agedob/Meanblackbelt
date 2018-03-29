import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BlackbeltService } from './blackbelt.service'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AlphaComponent } from './alpha/alpha.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { SingleComponent } from './single/single.component';


@NgModule({
  declarations: [
    AppComponent,
    AlphaComponent,
    PagenotfoundComponent,
    NewComponent,
    EditComponent,
    HeaderComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [BlackbeltService],
  bootstrap: [AppComponent]
})
export class AppModule { }
