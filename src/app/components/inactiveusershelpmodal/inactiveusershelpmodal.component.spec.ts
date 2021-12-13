import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveusershelpmodalComponent } from './inactiveusershelpmodal.component';

describe('InactiveusershelpmodalComponent', () => {
  let component: InactiveusershelpmodalComponent;
  let fixture: ComponentFixture<InactiveusershelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveusershelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveusershelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
