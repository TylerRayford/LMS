import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaphelpmodalComponent } from './maphelpmodal.component';

describe('MaphelpmodalComponent', () => {
  let component: MaphelpmodalComponent;
  let fixture: ComponentFixture<MaphelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaphelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaphelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
