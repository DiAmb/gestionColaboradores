import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-add-departamento',
  templateUrl: './add-departamento.component.html',
  styleUrls: ['./add-departamento.component.css'],
})
export class AddDepartamentoComponent {
  departamentoForm: FormGroup;
  paises: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    public dialogRef: MatDialogRef<AddDepartamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.departamentoForm = this.fb.group({
      nombre_departamento: [
        '',
        [Validators.required, Validators.maxLength(100)],
      ],
      id_pais: [this.data?.id_pais || '', Validators.required],
    });
  }

  onSave(): void {
    if (this.departamentoForm.valid) {
      const newDepartamento = this.departamentoForm.value;
      this.ubicacionService.createDepartamento(newDepartamento).subscribe(
        (response) => {
          console.log('Departamento added successfully', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding departamento', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
