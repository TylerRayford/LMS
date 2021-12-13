import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveclientshelpmodalComponent } from './inactiveclientshelpmodal.component';

describe('InactiveclientshelpmodalComponent', () => {
  let component: InactiveclientshelpmodalComponent;
  let fixture: ComponentFixture<InactiveclientshelpmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveclientshelpmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveclientshelpmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
