import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageusershelpmodalComponent } from './manageusershelpmodal.component';

describe('ManageusershelpmodalComponent', () => {
  let component: ManageusershelpmodalComponent;
  let fixture: ComponentFixture<ManageusershelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageusershelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageusershelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
