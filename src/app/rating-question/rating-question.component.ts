import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Questionnaire, Question } from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-rating-question',
  templateUrl: './rating-question.component.html',
  styleUrls: ['./rating-question.component.css'],
})
export class RatingQuestionComponent implements OnInit, OnDestroy {
  questionnaire: Questionnaire;
  sub: Subscription;
  form: FormGroup;
  question: Question;
  panelOpenState = false;
  expanded = false;
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
        console.log('question', this.question);
        this.form = this.questionsService.createFormGroup(this.question);
      }
    );
  }
  onSubmit() {
    this.togglePanel();
    if (this.form.status === 'VALID') {
      this.questionnaire = this.questionsService.updateQuestion(
        this.form.value.question_text,
        this.question,
        this.questionnaire
      );
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
