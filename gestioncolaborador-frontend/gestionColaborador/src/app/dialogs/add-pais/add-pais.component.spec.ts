import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaisComponent } from './add-pais.component';

describe('AddPaisComponent', () => {
  let component: AddPaisComponent;
  let fixture: ComponentFixture<AddPaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPaisComponent]
    });
    fixture = TestBed.createComponent(AddPaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
