import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnReturnHomeComponent } from './btn-return-home.component';

describe('BtnReturnHomeComponent', () => {
  let component: BtnReturnHomeComponent;
  let fixture: ComponentFixture<BtnReturnHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnReturnHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnReturnHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
