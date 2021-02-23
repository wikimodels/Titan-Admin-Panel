import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

import { Question, Questionnaire } from 'src/models/questionnaire.model';

import {
  GET_QUESTIONNAIRE_BY_QID,
  QID,
  UPLOAD_TEST_QUESTIONNAIRE,
} from 'consts/urls.consts';

import { getPristionQuestionnaire } from 'consts/pristin-questionnaire';
import { SlackService } from './shared/slack.service';
import { DelayedRetriesService } from './shared/delayed-retries.service';
import { BasicSnackbarModule } from '../basic-snackbar/basic-snackbar.module';
import { BasicSnackbarService } from '../basic-snackbar/basic-snackbar.service';
import { MessageType } from '../basic-snackbar/models/message-type';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  constructor(
    private http: HttpClient,
    private slackService: SlackService,
    private delayedRetriesService: DelayedRetriesService,
    private snackBar: BasicSnackbarService
  ) {}

  private questionnaireSubj = new BehaviorSubject<Questionnaire>({});
  setQuestionnaireSubj(questionnaire: Questionnaire) {
    this.questionnaireSubj.next(questionnaire);
  }
  getQuestionnaireSubj() {
    return this.questionnaireSubj.getValue();
  }

  questionnaire$ = this.getQuestionnaire();

  private getQuestionnaire(): Observable<Questionnaire> {
    let quesionnaireId = QID();
    return this.http
      .get<Questionnaire>(GET_QUESTIONNAIRE_BY_QID(quesionnaireId))
      .pipe(
        tap((q) => {
          console.log(q);
        }),
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

  uploadQuestionnaire(questionnaire: Questionnaire) {
    this.http
      .post(UPLOAD_TEST_QUESTIONNAIRE(), questionnaire)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
      .subscribe((value) => {
        this.snackBar.open('Questionnaire is updated', MessageType.INFO);
      });
  }

  uploadTestQuestionnaire() {
    const q = getPristionQuestionnaire();
    this.http
      .post(UPLOAD_TEST_QUESTIONNAIRE(), q)
      .pipe(catchError((error) => this.slackService.errorHandling(error)))
      .subscribe(console.log);
  }
}
