import { Injectable } from '@angular/core';
import { Question, Questionnaire } from 'src/models/questionnaire.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor() {}

  getQuestion(questionId: number, questionnaire: Questionnaire): Question {
    let question = questionnaire.questions.find(
      (q) => q.question_id === questionId
    );
    return question;
  }
  createFormGroup(question: Question) {
    let formGroup = new FormGroup({
      question_text: new FormControl(
        question.question_text,
        Validators.required
      ),
    });
    return formGroup;
  }

  updateQuestion(
    questionText: string,
    question: Question,
    questionnaire: Questionnaire
  ): Questionnaire {
    questionnaire.questions.forEach((q) => {
      if (q.question_id === question.question_id) {
        q.question_text = questionText;
      }
    });
    return questionnaire;
  }
}
