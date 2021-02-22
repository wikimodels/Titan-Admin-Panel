import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenGraphComponent } from './open-graph.component';

describe('OpenGraphComponent', () => {
  let component: OpenGraphComponent;
  let fixture: ComponentFixture<OpenGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
