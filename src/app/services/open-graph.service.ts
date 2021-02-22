import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import {
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
import { FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class OpenGraphService {
  constructor(
    private http: HttpClient,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService
  ) {}

  createFormGroup(openGraph: OpenGraph) {
    const formControls = {};
    Object.entries(openGraph).forEach(([key, value]) => {
      formControls[key] = new FormControl(value, Validators.required);
    });
    return formControls;
  }

  updateTestQuestionnaire(
    pageName: string,
    openGraph: OpenGraph,
    questionnaire: Questionnaire
  ): Questionnaire {
    if (pageName === 'respondents') {
      questionnaire.respondents.open_graph = openGraph;
    } else {
      questionnaire.questions.forEach((q) => {
        if (q.page_name === pageName) {
          q.open_graph = openGraph;
        }
      });
    }
    return questionnaire;
  }
  getOpenGraph(pageName: string, quesionnaire: Questionnaire): OpenGraph {
    let openGraph: OpenGraph;
    if (quesionnaire.respondents.page_name === pageName) {
      openGraph = quesionnaire.respondents.open_graph;
    }
    quesionnaire.questions.forEach((q) => {
      if (q.page_name === pageName) {
        openGraph = q.open_graph;
      }
    });
    console.log('openGraph', openGraph);
    return openGraph;
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

  uploadTestQuestionnaire() {
    const q = getPristionQuestionnaire();
    this.http
      .post(UPLOAD_TEST_QUESTIONNAIRE(), q)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
      .subscribe(console.log);
  }
}
