import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoredialogComponent } from './restoredialog.component';

describe('RestoredialogComponent', () => {
  let component: RestoredialogComponent;
  let fixture: ComponentFixture<RestoredialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoredialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
