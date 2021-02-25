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

import { getPristinQuestionnaire } from 'consts/pristin-questionnaire';
import { SlackService } from './shared/slack.service';
import { DelayedRetriesService } from './shared/delayed-retries.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from './questionnaire.service';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  createFormGroup(charts: Chart[]) {
    let array: FormGroup[] = [];
    charts.forEach((c) => {
      array.push(this.createChartFormGroup(c));
    });
    let formGroup = new FormGroup({
      charts: new FormArray(array),
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
    let charts: Chart[];
    if (quesionnaire.respondents.page_name === pageName) {
      charts = [...quesionnaire.respondents.respondents_charts];
    }
    quesionnaire.questions.forEach((q) => {
      if (q.page_name === pageName) {
        charts = q.question_charts;
      }
    });
    return charts;
  }

  updateCharts(
    pageName: string,
    charts: Chart[],
    questionnaire: Questionnaire
  ): Questionnaire {
    if (pageName === 'respondents') {
      questionnaire.respondents.respondents_charts = [...charts];
    } else {
      questionnaire.questions.forEach((q) => {
        if (q.page_name === pageName) {
          q.question_charts = [...charts];
        }
      });
    }
    return questionnaire;
  }
}
