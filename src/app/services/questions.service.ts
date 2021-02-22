import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import {
  Chart,
  OpenGraph,
  Question,
  Questionnaire,
} from 'src/models/questionnaire.model';

import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  UPLOAD_TEST_QUESTIONNAIRE,
} from 'consts/urls.consts';

import { getPristionQuestionnaire } from 'consts/pristin-questionnaire';
import { SlackService } from './shared/slack.service';
import { DelayedRetriesService } from './shared/delayed-retries.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(
    private http: HttpClient,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService
  ) {}

  getQuestion(questionId: number, questionnaire: Questionnaire): Question {
    let question = questionnaire.questions.find(
      (q) => q.question_id === questionId
    );
    return question;
  }
  createFormGroup(question: Question, questionnaire: Questionnaire) {
    let formGroup = new FormGroup({
      question_text: new FormControl(
        question.question_text,
        Validators.required
      ),
    });
    return formGroup;
  }

  private createChartFormGroup(chart: Chart) {
    const formControls = {};
    Object.entries(chart).forEach(([key, value]) => {
      formControls[key] = new FormControl(value, Validators.required);
    });
    return new FormGroup(formControls);
  }

  getCharts(pageName: string, quesionnaire: Questionnaire): Chart[] {
    console.log(pageName);
    console.log(quesionnaire);
    let charts: Chart[];
    if (quesionnaire.respondents.page_name === pageName) {
      charts = quesionnaire.respondents.respondents_charts;
    }
    quesionnaire.questions.forEach((q) => {
      if (q.page_name === pageName) {
        charts = q.question_charts;
      }
    });
    console.log('charts', charts);
    return charts;
  }

  questionnaire$ = this.getQuestionnaire();

  private getQuestionnaire(): Observable<Questionnaire> {
    let quesionnaireId = QID();
    return this.http
      .get<Questionnaire>(GET_QUESTIONNAIRE_BY_QID(quesionnaireId))
      .pipe(
        this.delayedRetriesService.retryWithoutBackoff(5),
        catchError((error) => this.slackService.errorHandling(error)),
        shareReplay(1)
      );
  }

  question$(questionId: number): Observable<Question> {
    return this.questionnaire$.pipe(
      map((questionnaire: Questionnaire) => {
        const question = questionnaire.questions.find(
          (q) => q.question_id === questionId
        );
        return question;
      })
    );
  }

  uploadQuestionnaire() {
    const q = getPristionQuestionnaire();
    this.http
      .post(UPLOAD_TEST_QUESTIONNAIRE(), q)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
      .subscribe(console.log);
  }
  uploadTestQuestionnaire() {
    const q = getPristionQuestionnaire();
    this.http
      .post(UPLOAD_TEST_QUESTIONNAIRE(), q)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
      .subscribe(console.log);
  }
}
