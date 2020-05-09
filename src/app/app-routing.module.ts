import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentComponent } from './equipment/equipment.component';
import { CompareComponent } from './compare/compare.component';


const routes: Routes = [
  {path: 'equipment', component: EquipmentComponent},
  {path: 'compare', component: CompareComponent},
  {path: '', redirectTo: '/equipment', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
