import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartamentoComponent } from './add-departamento.component';

describe('AddDepartamentoComponent', () => {
  let component: AddDepartamentoComponent;
  let fixture: ComponentFixture<AddDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDepartamentoComponent]
    });
    fixture = TestBed.createComponent(AddDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
