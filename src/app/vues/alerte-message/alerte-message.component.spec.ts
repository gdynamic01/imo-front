import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteMessageComponent } from './alerte-message.component';

describe('AlerteMessageComponent', () => {
  let component: AlerteMessageComponent;
  let fixture: ComponentFixture<AlerteMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlerteMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlerteMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
