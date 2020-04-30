import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EquipmentComponent } from './equipment/equipment.component';
import { BuildDetailsComponent } from './build-details/build-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    BuildDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
