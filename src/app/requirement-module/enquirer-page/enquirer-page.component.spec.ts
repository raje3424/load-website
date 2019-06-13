import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquirerPageComponent } from './enquirer-page.component';

describe('EnquirerPageComponent', () => {
  let component: EnquirerPageComponent;
  let fixture: ComponentFixture<EnquirerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquirerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquirerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
