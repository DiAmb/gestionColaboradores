import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-add-municipio',
  templateUrl: './add-municipio.component.html',
  styleUrls: ['./add-municipio.component.css'],
})
export class AddMunicipioComponent {
  municipioForm: FormGroup;
  departamentos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    public dialogRef: MatDialogRef<AddMunicipioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.municipioForm = this.fb.group({
      nombre_municipio: ['', [Validators.required, Validators.maxLength(100)]],
      id_departamento: [this.data?.id_departamento || '', Validators.required],
    });

    // Cargar departamentos del país seleccionado
    this.ubicacionService
      .getDepartamentosByPais(data?.id_pais)
      .subscribe((data) => {
        this.departamentos = data;
      });
  }

  onSave(): void {
    if (this.municipioForm.valid) {
      const newMunicipio = this.municipioForm.value;
      this.ubicacionService.createMunicipio(newMunicipio).subscribe(
        (response) => {
          console.log('Municipio added successfully', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding municipio', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
