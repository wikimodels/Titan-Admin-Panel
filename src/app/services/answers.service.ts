import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';

import {
  Answer,
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
export class AnswersService {
  createFormGroup(answers: Answer[]) {
    console.log('answers service', answers);
    let array: FormGroup[] = [];
    answers.forEach((a) => {
      array.push(this.createAnswerFormGroup(a));
    });
    let formGroup = new FormGroup({
      answers: new FormArray(array),
    });
    return formGroup;
  }

  private createAnswerFormGroup(answer: Answer) {
    return new FormGroup({
      answer_boolean_reply: new FormControl({
        value: answer.answer_boolean_reply,
        disabled: true,
      }),
      answer_id: new FormControl({ value: answer.answer_id, disabled: true }),
      answer_chart_text: new FormControl(
        answer.answer_chart_text,
        Validators.required
      ),
      answer_text: new FormControl(answer.answer_text, Validators.required),
      answer_clicked_style: new FormControl(answer.answer_clicked_style),
      answer_img_url: new FormControl(answer.answer_img_url),
      answer_img_alt: new FormControl(answer.answer_img_alt),
    });
  }

  getAnswers(pageName: string, quesionnaire: Questionnaire): Answer[] {
    let answers: Answer[];
    quesionnaire.questions.forEach((q) => {
      if (q.page_name === pageName) {
        answers = [...q.question_answers];
      }
    });
    return answers;
  }

  updateAnswers(
    pageName: string,
    answers: Answer[],
    questionnaire: Questionnaire
  ): Questionnaire {
    questionnaire.questions.forEach((q) => {
      if (q.page_name === pageName) {
        q.question_answers = [...answers];
      }
    });
    return questionnaire;
  }
}
