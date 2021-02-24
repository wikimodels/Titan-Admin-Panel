import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TEXT_ANSWER } from 'consts/routes.consts';
import { Subscription } from 'rxjs';
import { Questionnaire, Question } from 'src/models/questionnaire.model';
import { QuestionnaireService } from '../services/questionnaire.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css'],
})
export class TextQuestionComponent implements OnInit, OnDestroy {
  questionnaire: Questionnaire;
  sub: Subscription;
  form: FormGroup;
  question: Question;
  panelOpenState = false;
  constructor(
    public questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private questionsService: QuestionsService,
    private router: Router
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
    if (this.form.status === 'VALID') {
      this.questionnaire = this.questionsService.updateQuestion(
        this.form.value.question_text,
        this.question,
        this.questionnaire
      );
      this.questionnaireService.uploadQuestionnaire(this.questionnaire);
    }
  }
  goToAnswers() {
    this.router.navigate([TEXT_ANSWER + '/' + this.question.question_id]);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
