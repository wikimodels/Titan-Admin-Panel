import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HOME,
  PAGES,
  QUESTION,
  RESPONDENTS,
  QUESTIONNAIRE,
} from 'consts/routes.consts';
import { QuestionType } from 'src/models/questionnaire.model';
import { PagesVisitationsComponent } from './pages-visitations/pages-visitations.component';
import { QuestionComponent } from './question/question.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RespondentsComponent } from './respondents/respondents.component';
import { SiteVisitationsComponent } from './site-visitations/site-visitations.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME,
    pathMatch: 'full',
  },
  {
    path: HOME,
    component: SiteVisitationsComponent,
  },
  {
    path: PAGES,
    component: PagesVisitationsComponent,
  },
  {
    path: QUESTIONNAIRE,
    component: QuestionnaireComponent,
  },
  {
    path: RESPONDENTS,
    component: RespondentsComponent,
  },
  {
    path: QUESTION + '/:question_id',
    component: QuestionComponent,
  },
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
