import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { BuildScoreFormComponent } from './build-score-form/build-score-form.component';
import { CompareAllFormComponent } from './compare-all-form/compare-all-form.component';
import { CompareComponent } from './compare/compare.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { HeaderComponent } from './header/header.component';
import { SelectEquipmentComponent } from './select-equipment/select-equipment.component';
import { PercentPipe } from '@angular/common';

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
    ClipboardModule,
    HttpClientModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    NgbModule
  ],
  providers: [PercentPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
