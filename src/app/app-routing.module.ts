import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HOME,
  PAGES,
  QUESTION,
  RESPONDENTS,
  QUESTIONNAIRE,
  TEXT_QUESTION,
  RATING_QUESTION,
} from 'consts/routes.consts';
import { QuestionType } from 'src/models/questionnaire.model';
import { PagesVisitationsComponent } from './pages-visitations/pages-visitations.component';
import { QuestionComponent } from './question/question.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RatingQuestionComponent } from './rating-question/rating-question.component';
import { RespondentsComponent } from './respondents/respondents.component';
import { SiteVisitationsComponent } from './site-visitations/site-visitations.component';
import { TextAnswerComponent } from './text-answer/text-answer.component';

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
  {
    path: TEXT_QUESTION + '/:question_id',
    component: TextAnswerComponent,
  },
  {
    path: RATING_QUESTION + '/:question_id',
    component: RatingQuestionComponent,
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
