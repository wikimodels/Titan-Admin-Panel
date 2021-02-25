import { Component, OnInit } from '@angular/core';
import { getPristinQuestionnaire } from 'consts/pristin-questionnaire';
import { QuestionnaireService } from '../services/questionnaire.service';
import { UserAnswersTestDataService } from '../services/users-answers-test-data.service';
import { VisitationStatsTestDataService } from '../services/visitations-stats-test-data.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css'],
})
export class UtilsComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private visitationsTestDataService: VisitationStatsTestDataService,
    private usersAnswersService: UserAnswersTestDataService
  ) {}
  uploadPristinQuestionnaire() {
    const pristinQuestionnaire = getPristinQuestionnaire();
    this.questionnaireService.uploadQuestionnaire(pristinQuestionnaire);
  }
  ngOnInit(): void {}

  uploadVisitationsStatsTestData() {
    this.visitationsTestDataService.uploadVisitationStatsTestData();
  }

  deleteUsersAnswers() {
    this.usersAnswersService.deleteAllUsersAnsers();
  }

  uploadUsersAnswersTestData() {
    this.usersAnswersService.uploadUserAnswersTestData();
  }

  deleteVisitationStats() {
    this.visitationsTestDataService.deleteAllVisitaionsStats();
  }
}
