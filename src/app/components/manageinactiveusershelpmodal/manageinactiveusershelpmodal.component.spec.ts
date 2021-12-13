import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageinactiveusershelpmodalComponent } from './manageinactiveusershelpmodal.component';

describe('ManageinactiveusershelpmodalComponent', () => {
  let component: ManageinactiveusershelpmodalComponent;
  let fixture: ComponentFixture<ManageinactiveusershelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageinactiveusershelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageinactiveusershelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
