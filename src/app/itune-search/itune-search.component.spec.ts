import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItuneSearchComponent } from './itune-search.component';

describe('ItuneSearchComponent', () => {
  let component: ItuneSearchComponent;
  let fixture: ComponentFixture<ItuneSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItuneSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItuneSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
