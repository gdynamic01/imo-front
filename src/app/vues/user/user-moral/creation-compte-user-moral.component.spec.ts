import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCompteUserMoralComponent } from './creation-compte-user-moral.component';

describe('CreationCompteUserMoralComponent', () => {
  let component: CreationCompteUserMoralComponent;
  let fixture: ComponentFixture<CreationCompteUserMoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationCompteUserMoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationCompteUserMoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
