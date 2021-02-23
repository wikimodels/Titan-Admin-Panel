import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private tqs: QuestionnaireService) {}

  ngOnInit(): void {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  uploadTQ() {
    this.tqs.uploadTestQuestionnaire();
  }
}
