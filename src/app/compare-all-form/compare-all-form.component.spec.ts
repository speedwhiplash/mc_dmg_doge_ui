import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareAllFormComponent } from './compare-all-form.component';

describe('CompareAllFormComponent', () => {
  let component: CompareAllFormComponent;
  let fixture: ComponentFixture<CompareAllFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareAllFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareAllFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
