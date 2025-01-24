import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColaboradoresService } from 'src/app/servicios/colaboradores/colaboradores.service';
@Component({
  selector: 'app-add-colaborador',
  templateUrl: './add-colaborador.component.html',
  styleUrls: ['./add-colaborador.component.css'],
})
export class AddColaboradorComponent {
  colaboradorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private colaboradoresService: ColaboradoresService,
    private dialogRef: MatDialogRef<AddColaboradorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.colaboradorForm = this.fb.group({
      id_cui_colaborador: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      nombres_colaborador: ['', Validators.required],
      apellidos_colaborador: ['', Validators.required],
      fecha_nacimiento_colaborador: ['', Validators.required],
      telefono_colaborador: ['', Validators.required],
      correo_electronico_colaborador: [
        '',
        [Validators.required, Validators.email],
      ],
    });
  }

  onSubmit() {
    if (this.colaboradorForm.valid) {
      this.dialogRef.close(this.colaboradorForm.value);
      this.colaboradoresService.create(this.colaboradorForm.value).subscribe(
        (response) => {
          console.log('Colaborador creado exitosamente', response);
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error al crear colaborador', error);
        }
      );
    }
  }
}
