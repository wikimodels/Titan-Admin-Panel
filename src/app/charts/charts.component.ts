import { Component, Input, OnInit } from '@angular/core';
import { validateBasis } from '@angular/flex-layout';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  Chart,
  OpenGraph,
  Questionnaire,
} from 'src/models/questionnaire.model';
import { ChartsService } from '../services/charts.service';
import { OpenGraphService } from '../services/open-graph.service';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  questionnaire: Questionnaire;
  @Input() pageName: string;
  panelOpenState = false;
  sub: Subscription;
  myCharts: Chart[];
  form: FormGroup;

  constructor(
    public questionnaireService: QuestionnaireService,
    private chartsService: ChartsService
  ) {}

  ngOnInit(): void {
    this.sub = this.questionnaireService.questionnaire$.subscribe(
      (questionnaire: Questionnaire) => {
        this.questionnaire = questionnaire;
        this.myCharts = this.chartsService.getCharts(
          this.pageName,
          this.questionnaire
        );
        this.form = this.chartsService.createFormGroup(this.myCharts);
        console.log('Form', this.form);
      }
    );
  }

  charts(): FormArray {
    return this.form.get('charts') as FormArray;
  }

  onSubmit() {
    if (this.form.status === 'VALID') {
      this.questionnaire.respondents.respondents_charts = this.form.controls.charts.value;
      this.questionnaireService.uploadQuestionnaire(this.questionnaire);
    }
    console.log(this.form.status);
  }
  addChart() {
    this.charts().push(
      new FormGroup({
        id: new FormControl('0000-0000-0000-0000-0000', Validators.required),
        type: new FormControl('standart-chart', Validators.required),
        ngClass: new FormControl('standart-chart', Validators.required),
      })
    );
  }
  deleteChart(index: number) {
    this.charts().removeAt(index);
  }
}
