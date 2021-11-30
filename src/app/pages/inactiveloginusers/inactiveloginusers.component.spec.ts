import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveloginusersComponent } from './inactiveloginusers.component';

describe('InactiveloginusersComponent', () => {
  let component: InactiveloginusersComponent;
  let fixture: ComponentFixture<InactiveloginusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveloginusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveloginusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
