import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-edit-municipio',
  templateUrl: './edit-municipio.component.html',
  styleUrls: ['./edit-municipio.component.css'],
})
export class EditMunicipioComponent {
  municipioForm: FormGroup;
  departamentos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    public dialogRef: MatDialogRef<EditMunicipioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.municipioForm = this.fb.group({
      id_municipio: [this.data.id_municipio, Validators.required],
      nombre_municipio: [
        this.data.nombre_municipio,
        [Validators.required, Validators.maxLength(100)],
      ],
    });
  }

  onSave(): void {
    if (this.municipioForm.valid) {
      const updatedMunicipio = this.municipioForm.value;

      this.ubicacionService
        .updateMunicipio(this.data.id_municipio, updatedMunicipio)
        .subscribe(
          (response) => {
            console.log('Municipio actualizado correctamente', response);
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error actualizando municipio', error);
          }
        );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
