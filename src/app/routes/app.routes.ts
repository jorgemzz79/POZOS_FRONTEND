/*/
import { Routes } from '@angular/router';
//import { PozosPageComponent } from '../features/pozos/pages/pozos-page';
import { PozosPageComponent } from '../features/pozos/pages/pozos-page.component';
export const appRoutes: Routes = [
  { path: '', redirectTo: 'pozos', pathMatch: 'full' },
  { path: 'pozos', component: PozosPageComponent },
];
/*/



import { Routes } from '@angular/router';
import { PozoDetalleComponent } from '../features/pozos/pages/pozo-detalle.component';
import { PozoFormComponent } from '../features/pozos/pages/pozo-form.component';
import { PozosPageComponent } from '../features/pozos/pages/pozos-page.component';
import { MotorComponent } from '../features/pozos/components/motor.component';
import { LoginComponent } from '../pages/login.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pozos', component: PozosPageComponent },
  { path: 'pozos/nuevo', component: PozoFormComponent },
  { path: 'pozos/:id', component: PozoDetalleComponent },
  { path: 'pozos/:id/editar', component: PozoFormComponent },
  { path: 'motor', component: MotorComponent }
];

