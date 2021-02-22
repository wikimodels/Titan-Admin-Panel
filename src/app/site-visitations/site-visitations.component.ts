import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'src/models/questionnaire.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as defaults from '../../assets/utils/defaults.json';

@Component({
  selector: 'app-site-visitations',
  templateUrl: './site-visitations.component.html',
  styleUrls: ['./site-visitations.component.css'],
})
export class SiteVisitationsComponent implements OnInit {
  myCharts: Chart[];
  elementHeight = defaults.chartsElementHeight;
  constructor(public deviceDetectorService: DeviceDetectorService) {}

  ngOnInit(): void {
    this.myCharts = [
      {
        id: '3f3ba6d6-b483-46fc-acf9-15e79108bb15',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
      {
        id: '8b71a190-4c84-4055-a606-d00d16aa391c',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
      {
        id: '92191b19-0427-4910-9fd3-fb6e89a6fb2e',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
      {
        id: '7229fd99-f17a-40b4-83ea-c38524c3ef6e',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
      {
        id: '1c64e56b-9467-4cac-8f1e-a2e22f58601e',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
    ];
  }
}
