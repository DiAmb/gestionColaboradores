import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-add-pais',
  templateUrl: './add-pais.component.html',
  styleUrls: ['./add-pais.component.css'],
})
export class AddPaisComponent {
  paisForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    public dialogRef: MatDialogRef<AddPaisComponent>
  ) {
    this.paisForm = this.fb.group({
      nombre_pais: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSave(): void {
    if (this.paisForm.valid) {
      const newPais = this.paisForm.value;
      this.ubicacionService.createPais(newPais).subscribe(
        (response) => {
          console.log('Pais added successfully', response);
          this.dialogRef.close();
        },
        (error) => {
          console.error('Error adding pais', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
