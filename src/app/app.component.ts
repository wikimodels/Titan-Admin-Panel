import { Component, OnInit } from '@angular/core';
import { TestDataService } from './services/test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Titan Admin Panel';
  constructor(private testDateService: TestDataService) {}
  ngOnInit() {}
  generateTestData() {
    this.testDateService.uploadVisitationStatsTestDate();
  }
}
