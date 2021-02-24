import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HOME,
  PAGES,
  QUESTION,
  RESPONDENTS,
  SITE,
  TEXT_QUESTION,
  RATING_QUESTION,
  TEXT_ANSWER,
} from 'consts/routes.consts';
import { QuestionType } from 'src/models/questionnaire.model';
import { PagesVisitationsComponent } from './pages-visitations/pages-visitations.component';
import { QuestionComponent } from './question/question.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { RatingQuestionComponent } from './rating-question/rating-question.component';
import { RespondentsComponent } from './respondents/respondents.component';
import { SiteVisitationsComponent } from './site-visitations/site-visitations.component';
import { TextAnswerComponent } from './text-answer/text-answer.component';
import { TextQuestionComponent } from './text-question/text-question.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: HOME,
    pathMatch: 'full',
  },
  {
    path: HOME,
    component: QuestionnaireComponent,
  },

  {
    path: PAGES,
    component: PagesVisitationsComponent,
  },
  {
    path: SITE,
    component: SiteVisitationsComponent,
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
    path: TEXT_ANSWER + '/:question_id',
    component: TextAnswerComponent,
  },
  {
    path: TEXT_QUESTION + '/:question_id',
    component: TextQuestionComponent,
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
