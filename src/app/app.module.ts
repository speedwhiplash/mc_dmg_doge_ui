import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EquipmentComponent } from './equipment/equipment.component';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { CompareAllFormComponent } from './compare-all-form/compare-all-form.component';
import { BuildScoreFormComponent } from './build-score-form/build-score-form.component';
import { HeaderComponent } from './header/header.component';
import { CompareComponent } from './compare/compare.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    BuildDetailsComponent,
    CompareAllFormComponent,
    BuildScoreFormComponent,
    HeaderComponent,
    CompareComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
