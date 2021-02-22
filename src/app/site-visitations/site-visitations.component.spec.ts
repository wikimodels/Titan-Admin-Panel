import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteVisitationsComponent } from './site-visitations.component';

describe('SiteVisitationsComponent', () => {
  let component: SiteVisitationsComponent;
  let fixture: ComponentFixture<SiteVisitationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteVisitationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteVisitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
