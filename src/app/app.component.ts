import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Title, Meta, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private title: Title,
    private meta: Meta,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/googleLogin.svg'
      )
    );
  }
  ngOnInit() {
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
  }
}
