import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesVisitationsComponent } from './pages-visitations.component';

describe('PagesVisitationsComponent', () => {
  let component: PagesVisitationsComponent;
  let fixture: ComponentFixture<PagesVisitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesVisitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesVisitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
