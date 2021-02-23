import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OpenGraph, Question } from 'src/models/questionnaire.model';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';
import { QuestionnaireService } from '../services/questionnaire.service';
import { TextAnswerService } from '../services/text-answer.service';

import * as defaults from '../../assets/utils/defaults.json';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-text-answer',
  templateUrl: './text-answer.component.html',
  styleUrls: ['./text-answer.component.css'],
  providers: [TextAnswerService],
})
export class TextAnswerComponent implements OnInit, AfterViewInit, OnDestroy {
  question: Question;
  textAnswerQuestions: TextAnswerQuestion[] = [];
  openGraph: OpenGraph;
  questionSub: Subscription;
  skip = 0;
  limit = 20;
  buttonClass: string;
  elementHeight = defaults.textElementHeight;
  collectionTotalCount = 0;
  questionId = +this.route.snapshot.params['question_id'];

  textAnswerSub: Subscription;
  totalCountSub: Subscription;
  constructor(
    private textAnswerService: TextAnswerService,
    private questionnaireService: QuestionnaireService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.buttonClass = 'pulsar';
    }, 4000);
    this.questionSub = this.questionnaireService
      .question$(this.questionId)
      .subscribe((value) => {
        this.question = value;
        if (this.question.open_graph) {
          this.openGraph = value.open_graph;
          this.title.setTitle(this.openGraph.title);
          this.meta.addTags([
            { name: 'og:title', content: this.openGraph.title },
            { name: 'og:description', content: this.openGraph.description },
            { name: 'og:image', content: this.openGraph.image },
            { name: 'og:url', content: this.openGraph.site_url },
          ]);
        }
      });
    this.textAnswerService.getCollectionCount();
    this.textAnswerService.getPagedQuestions(
      this.questionId,
      this.skip,
      this.limit
    );

    this.textAnswerSub = this.textAnswerService.textAnswerQuestionSub$.subscribe(
      (value: TextAnswerQuestion[]) => {
        value.forEach((val) => {
          this.textAnswerQuestions.push(val);
        });
        console.log(this.textAnswerQuestions);
      }
    );

    this.totalCountSub = this.textAnswerService.collectionCountSub$.subscribe(
      (value) => {
        this.collectionTotalCount = value;
        console.log(this.collectionTotalCount);
      }
    );
  }

  ngAfterViewInit() {}
  onScroll() {
    this.buttonClass = '';
    const textAnswerQuestionsCount = this.textAnswerQuestions.length;
    if (textAnswerQuestionsCount < this.collectionTotalCount) {
      this.skip = this.skip + 1;
      console.log('Scrolled', this.skip);
      this.textAnswerService.getPagedQuestions(
        this.questionId,
        this.skip,
        this.limit
      );
    }
  }
  ngOnDestroy() {
    this.questionSub.unsubscribe();
    this.totalCountSub.unsubscribe();
    this.textAnswerSub.unsubscribe();
  }
}
