import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuResponsiveComponent } from './menu-responsive.component';

describe('MenuResponsiveComponent', () => {
  let component: MenuResponsiveComponent;
  let fixture: ComponentFixture<MenuResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
