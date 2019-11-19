import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItuneSearchListComponent } from './itune-search-list.component';

describe('ItuneSearchListComponent', () => {
  let component: ItuneSearchListComponent;
  let fixture: ComponentFixture<ItuneSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItuneSearchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItuneSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
