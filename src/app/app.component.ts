import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private meta: Meta) {}
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
