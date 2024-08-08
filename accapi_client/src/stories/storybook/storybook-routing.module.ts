import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [

  //{ path: 'storybook-button-fortest', component: AvatarComponent },
  /*{ path: 'regist', component: MyAccountForm2Component },*/
  /*{ path: 'register-form2', component: MyAccountForm2Component },*/
  { path: '', redirectTo: 'home', pathMatch: 'full' },/**/
  { path: '**', redirectTo: 'home', },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Login2RoutingModule { }
