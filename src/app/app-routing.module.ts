import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CHARTS_QUESTION, MENU, RESPONDENTS } from 'consts/routes.consts';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: MENU,
  //   pathMatch: 'full',
  // },
  // {
  //   path: MENU,
  //   component: MenuComponent,
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
