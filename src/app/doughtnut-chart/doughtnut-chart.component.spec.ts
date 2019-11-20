import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughtnutChartComponent } from './doughtnut-chart.component';

describe('DoughtnutChartComponent', () => {
  let component: DoughtnutChartComponent;
  let fixture: ComponentFixture<DoughtnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughtnutChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughtnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
