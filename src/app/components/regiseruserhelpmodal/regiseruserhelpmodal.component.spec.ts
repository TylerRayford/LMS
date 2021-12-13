import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiseruserhelpmodalComponent } from './regiseruserhelpmodal.component';

describe('RegiseruserhelpmodalComponent', () => {
  let component: RegiseruserhelpmodalComponent;
  let fixture: ComponentFixture<RegiseruserhelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegiseruserhelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiseruserhelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
