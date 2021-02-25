import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import {
  HOME,
  PAGES,
  QUESTION,
  RESPONDENTS,
  QUESTIONNAIRE,
  TEXT_QUESTION,
  RATING_QUESTION,
  TEXT_ANSWER,
  UTILS,
  LOGIN,
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
import { UtilsComponent } from './utils/utils.component';
import { LoginComponent } from './login/login.component';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo([LOGIN]);

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
    path: QUESTIONNAIRE,
    component: QuestionnaireComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: PAGES,
    component: PagesVisitationsComponent,
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
  {
    path: UTILS,
    component: UtilsComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: LOGIN,
    component: LoginComponent,
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
