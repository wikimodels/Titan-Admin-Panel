import { Component, OnInit } from '@angular/core';
import { getPristinQuestionnaire } from 'consts/pristin-questionnaire';
import { QuestionnaireService } from '../services/questionnaire.service';
import { VisitationStatsTestDataService } from '../services/visitations-stats-test-data.service';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.css'],
})
export class UtilsComponent implements OnInit {
  constructor(
    private questionnaireService: QuestionnaireService,
    private visitationsTestDataService: VisitationStatsTestDataService
  ) {}
  uploadPristinQuestionnaire() {
    const pristinQuestionnaire = getPristinQuestionnaire();
    this.questionnaireService.uploadQuestionnaire(pristinQuestionnaire);
  }
  ngOnInit(): void {}

  uploadVisitationStatsTestData() {
    this.visitationsTestDataService.uploadVisitationStatsTestData();
  }
}
