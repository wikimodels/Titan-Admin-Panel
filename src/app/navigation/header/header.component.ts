import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HOME } from 'consts/routes.consts';

import { QuestionnaireService } from 'src/app/services/questionnaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private tqs: QuestionnaireService, private router: Router) {}

  ngOnInit(): void {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  uploadTQ() {
    this.tqs.uploadTestQuestionnaire();
  }
  goToHome() {
    this.router.navigate([HOME]);
  }
}
