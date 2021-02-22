import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QUESTION, RESPONDENTS } from 'consts/routes.consts';
import { Observable } from 'rxjs';
import {
  Question,
  Questionnaire,
  QuestionType,
} from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnInit {
  questionnaire$: Observable<Questionnaire>;

  constructor(
    public questionnaireService: QuestionnaireService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionnaire$ = this.questionnaireService.questionnaire$;
  }
  editQuestion(question: Question) {
    if (
      question.question_type != QuestionType.RATING_ANSWER &&
      question.question_type != QuestionType.TEXT
    ) {
      this.router.navigate([QUESTION + '/' + question.question_id]);
    }
  }
  editRespondents() {
    this.router.navigate([RESPONDENTS]);
  }
}
