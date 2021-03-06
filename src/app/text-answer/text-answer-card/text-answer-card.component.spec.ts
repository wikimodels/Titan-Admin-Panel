import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAnswerCardComponent } from './text-answer-card.component';

describe('TextAnswerCardComponent', () => {
  let component: TextAnswerCardComponent;
  let fixture: ComponentFixture<TextAnswerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAnswerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAnswerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
