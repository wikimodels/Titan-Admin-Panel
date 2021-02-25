import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OpenGraph, Questionnaire } from 'src/models/questionnaire.model';
import { OpenGraphService } from '../services/open-graph.service';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-open-graph',
  templateUrl: './open-graph.component.html',
  styleUrls: ['./open-graph.component.css'],
})
export class OpenGraphComponent implements OnInit, OnDestroy {
  @Input() pageName: string;
  panelOpenState = false;
  sub: Subscription;
  questionnaire: Questionnaire;
  openGraph: OpenGraph;
  form: FormGroup;
  expanded = false;
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
    this.togglePanel();
    if (this.form.status === 'VALID') {
      this.questionnaire = this.openGraphService.updateOpenGraph(
        this.pageName,
        this.form.value,
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
