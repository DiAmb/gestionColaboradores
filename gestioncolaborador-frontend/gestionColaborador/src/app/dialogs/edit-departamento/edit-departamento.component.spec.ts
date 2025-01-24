import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepartamentoComponent } from './edit-departamento.component';

describe('EditDepartamentoComponent', () => {
  let component: EditDepartamentoComponent;
  let fixture: ComponentFixture<EditDepartamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDepartamentoComponent]
    });
    fixture = TestBed.createComponent(EditDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
