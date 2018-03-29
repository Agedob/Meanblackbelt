import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlphaComponent } from './alpha/alpha.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SingleComponent } from './single/single.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  {path: 'Dashboard', component: AlphaComponent },
  {path: 'make_a_new', component: NewComponent},
  {path: 'detail/:id', component: SingleComponent},
  // { path: 'edit/:id', component: EditComponent},
  {path: '', pathMatch: 'full', redirectTo: "/Dashboard" },
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
