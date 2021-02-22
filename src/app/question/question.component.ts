import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  questionnaire: Questionnaire;
  sub: Subscription;
  form: FormGroup;
  question: Question;
  panelOpenState = false;
  constructor(
    public questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private questionsService: QuestionsService
  ) {}

  ngOnInit(): void {
    this.sub = this.questionnaireService.questionnaire$.subscribe(
      (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.question = this.questionsService.getQuestion(
          +this.route.snapshot.params['question_id'],
          this.questionnaire
        );
        this.form = this.questionsService.createFormGroup(
          this.question,
          this.questionnaire
        );
      }
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
