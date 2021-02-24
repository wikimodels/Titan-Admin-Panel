import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'src/models/questionnaire.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as defaults from '../../assets/utils/defaults.json';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pages-visitations',
  templateUrl: './pages-visitations.component.html',
  styleUrls: ['./pages-visitations.component.css'],
})
export class PagesVisitationsComponent implements OnInit {
  myCharts: Chart[];
  elementHeight = defaults.chartsElementHeight;
  constructor(
    public deviceDetectorService: DeviceDetectorService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Titan Admin Panel');
    this.meta.addTags([
      { name: 'og:title', content: 'Titan Admin Panel' },
      {
        name: 'og:description',
        content: 'Site contains basic charts about Titan Survey',
      },
      {
        name: 'og:image',
        content: './assets/images/titan-survey-admin-panel.jpg',
      },
      { name: 'og:url', content: '' },
    ]);
    this.myCharts = [
      {
        id: 'e6551dd3-733f-4722-9458-580b4689648d',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
      {
        id: '6cb1c94a-9f9d-4a92-81f4-02a6dc045cec',
        ngClass: 'standart-chart',
        type: ChartType.STANDART,
      },
    ];
  }
}
