import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-edit-pais',
  templateUrl: './edit-pais.component.html',
  styleUrls: ['./edit-pais.component.css'],
})
export class EditPaisComponent {
  paisForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    public dialogRef: MatDialogRef<EditPaisComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializamos el formulario con los datos actuales del país
    this.paisForm = this.fb.group({
      id_pais: [this.data.id_pais, Validators.required],
      nombre_pais: [
        this.data.nombre_pais,
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  onSave(): void {
    if (this.paisForm.valid) {
      const updatedPais = this.paisForm.value;

      this.ubicacionService
        .updatePais(this.data.id_pais, updatedPais)
        .subscribe(
          (response) => {
            console.log('País actualizado correctamente', response);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error actualizando país', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
