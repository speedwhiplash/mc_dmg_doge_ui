import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { BuildScoreFormComponent } from './build-score-form/build-score-form.component';
import { CompareAllFormComponent } from './compare-all-form/compare-all-form.component';
import { CompareComponent } from './compare/compare.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { HeaderComponent } from './header/header.component';
import { SelectEquipmentComponent } from './select-equipment/select-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    EquipmentComponent,
    BuildDetailsComponent,
    CompareAllFormComponent,
    BuildScoreFormComponent,
    HeaderComponent,
    CompareComponent,
    SelectEquipmentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
