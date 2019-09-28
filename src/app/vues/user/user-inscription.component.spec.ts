import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInscriptionComponent } from './user-inscription.component';

describe('UserInscriptionComponent', () => {
  let component: UserInscriptionComponent;
  let fixture: ComponentFixture<UserInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
