import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildScoreFormComponent } from './build-score-form.component';

describe('BuildScoreFormComponent', () => {
  let component: BuildScoreFormComponent;
  let fixture: ComponentFixture<BuildScoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuildScoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildScoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
