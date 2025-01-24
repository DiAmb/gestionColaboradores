import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-edit-departamento',
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.css'],
})
export class EditDepartamentoComponent {
  departamentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    public dialogRef: MatDialogRef<EditDepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.departamentoForm = this.fb.group({
      id_departamento: [this.data.id_departamento, Validators.required],
      nombre_departamento: [
        this.data.nombre_departamento,
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  onSave(): void {
    if (this.departamentoForm.valid) {
      const updatedDepartamento = this.departamentoForm.value;

      this.ubicacionService
        .updateDepartamento(this.data.id_departamento, updatedDepartamento)
        .subscribe(
          (response) => {
            console.log('Departamento actualizado correctamente', response);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error actualizando departamento', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
