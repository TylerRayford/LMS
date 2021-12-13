import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextservicehelpmodalComponent } from './nextservicehelpmodal.component';

describe('NextservicehelpmodalComponent', () => {
  let component: NextservicehelpmodalComponent;
  let fixture: ComponentFixture<NextservicehelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextservicehelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextservicehelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
