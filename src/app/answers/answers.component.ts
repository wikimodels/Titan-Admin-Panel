import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Questionnaire,
  Question,
  Chart,
  Answer,
} from 'src/models/questionnaire.model';
import { AnswersService } from '../services/answers.service';
import { ChartsService } from '../services/charts.service';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css'],
})
export class AnswersComponent implements OnInit, OnDestroy {
  questionnaire: Questionnaire;
  @Input() pageName: string;
  panelOpenState = false;
  sub: Subscription;
  myAnswers: Answer[];
  form: FormGroup;

  constructor(
    public questionnaireService: QuestionnaireService,
    private answersService: AnswersService
  ) {}

  ngOnInit(): void {
    this.sub = this.questionnaireService.questionnaire$.subscribe(
      (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.myAnswers = this.answersService.getAnswers(
          this.pageName,
          this.questionnaire
        );
        console.log('ANSWERS', this.myAnswers);
        this.myAnswers.forEach((a) => {
          console.log(a);
        });
        this.form = this.answersService.createFormGroup(this.myAnswers);
        // console.log('Form', this.form);
      }
    );
  }

  answers(): FormArray {
    return this.form.get('answers') as FormArray;
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.questionnaire = this.answersService.updateAnswers(
        this.pageName,
        this.form.value.answers,
        this.questionnaire
      );

      this.questionnaireService.uploadQuestionnaire(this.questionnaire);
    }
    console.log(this.form.status);
  }

  addAnswer(index: number) {
    this.answers().push(
      new FormGroup({
        answer_boolean_reply: new FormControl({ value: index, disabled: true }),
        answer_chart_text: new FormControl('', Validators.required),
        answer_text: new FormControl('', Validators.required),
        answer_id: new FormControl({ value: index, disabled: true }),
        answer_clicked_style: new FormControl('initial'),
        answer_img_url: new FormControl(''),
        answer_img_alt: new FormControl(''),
      })
    );
  }

  deleteAnswer(index: number) {
    this.answers().removeAt(index);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}