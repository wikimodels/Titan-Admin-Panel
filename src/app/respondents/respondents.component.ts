import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { Questionnaire, Respondents } from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-respondents',
  templateUrl: './respondents.component.html',
  styleUrls: ['./respondents.component.css'],
})
export class RespondentsComponent implements OnInit, OnDestroy {
  respondents: Respondents;
  questionnaire: Questionnaire;
  sub: Subscription;
  form: FormGroup;
  panelOpenState = false;
  expanded = false;
  constructor(public questionnaireService: QuestionnaireService) {}

  ngOnInit(): void {
    this.sub = this.questionnaireService.questionnaire$.subscribe(
      (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.respondents = questionnaire.respondents;
        this.form = new FormGroup({
          respondents_header: new FormControl(
            this.respondents.respondents_header,
            Validators.required
          ),
          respondents_subheader: new FormControl(
            this.respondents.respondents_subheader,
            Validators.required
          ),
        });
      }
    );
  }

  onSubmit() {
    this.togglePanel();
    if (this.form.status === 'VALID') {
      const { respondents_header, respondents_subheader } = this.form.value;
      this.questionnaire.respondents.respondents_header = respondents_header;
      this.questionnaire.respondents.respondents_subheader = respondents_subheader;

      this.questionnaireService.uploadQuestionnaire(this.questionnaire);
    }
  }
  private togglePanel() {
    this.expanded = this.expanded == true ? false : true;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
