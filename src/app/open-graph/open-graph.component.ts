import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OpenGraph, Questionnaire } from 'src/models/questionnaire.model';
import { BasicSnackbarService } from '../basic-snackbar/basic-snackbar.service';
import { OpenGraphService } from '../services/open-graph.service';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-open-graph',
  templateUrl: './open-graph.component.html',
  styleUrls: ['./open-graph.component.css'],
})
export class OpenGraphComponent implements OnInit {
  @Input() pageName: string;
  panelOpenState = false;
  sub: Subscription;
  questionnaire: Questionnaire;
  openGraph: OpenGraph;
  form: FormGroup;

  constructor(
    public questionnaireService: QuestionnaireService,
    private openGraphService: OpenGraphService
  ) {}

  ngOnInit(): void {
    this.sub = this.questionnaireService.questionnaire$.subscribe(
      (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.openGraph = this.openGraphService.getOpenGraph(
          this.pageName,
          this.questionnaire
        );
        this.form = new FormGroup(
          this.openGraphService.createFormGroup(this.openGraph)
        );
      }
    );
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.questionnaire = this.openGraphService.updateTestQuestionnaire(
        this.pageName,
        this.form.value,
        this.questionnaire
      );
      this.questionnaireService.uploadQuestionnaire(this.questionnaire);
    }
  }
}
