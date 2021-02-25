import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './material.module';

import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { LayoutComponent } from './layout/layout.component';
import { ButtonDownComponent } from './button-down/button-down.component';
import { MongodbChartComponent } from './mongodb-chart/mongodb-chart.component';
import { MongoPipe } from './pipes/mongo.pipe';
import { SiteVisitationsComponent } from './site-visitations/site-visitations.component';
import { PagesVisitationsComponent } from './pages-visitations/pages-visitations.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { BasicSnackbarModule } from './basic-snackbar/basic-snackbar.module';
import { RespondentsComponent } from './respondents/respondents.component';
import { OpenGraphComponent } from './open-graph/open-graph.component';
import { ChartsComponent } from './charts/charts.component';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { DialogComponent } from './dialog/dialog.component';
import { TextAnswerComponent } from './text-answer/text-answer.component';
import { TextAnswerCardComponent } from './text-answer/text-answer-card/text-answer-card.component';
import { RatingQuestionComponent } from './rating-question/rating-question.component';
import { TextQuestionComponent } from './text-question/text-question.component';
import { UtilsComponent } from './utils/utils.component';

@NgModule({
  declarations: [
    MongoPipe,
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    ButtonDownComponent,
    SidenavListComponent,
    MongodbChartComponent,
    SiteVisitationsComponent,
    PagesVisitationsComponent,
    QuestionnaireComponent,
    TextAnswerComponent,
    TextAnswerCardComponent,
    RespondentsComponent,
    OpenGraphComponent,
    QuestionComponent,
    AnswersComponent,
    DialogComponent,
    ChartsComponent,
    RatingQuestionComponent,
    TextQuestionComponent,
    UtilsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    BasicSnackbarModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserModule,
    FlexLayoutModule.withConfig({
      ssrObserveBreakpoints: ['xs', 'lt-md', 'lt-lg', 'gt-md'],
    }),
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent],
})
export class AppModule {}
