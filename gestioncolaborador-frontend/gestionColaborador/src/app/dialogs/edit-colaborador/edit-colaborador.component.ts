import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ColaboradoresService } from 'src/app/servicios/colaboradores/colaboradores.service';
import { EmpresasService } from 'src/app/servicios/empresas/empresas.service';

@Component({
  selector: 'app-edit-colaborador',
  templateUrl: './edit-colaborador.component.html',
  styleUrls: ['./edit-colaborador.component.css'],
})
export class EditColaboradorComponent {
  colaboradorForm: FormGroup;
  empresas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private colaboradoresService: ColaboradoresService,
    private dialogRef: MatDialogRef<EditColaboradorComponent>,
    private empresasService: EmpresasService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    const fechaNacimiento = this.formatDate(data.fecha_nacimiento_colaborador);

    this.colaboradorForm = this.fb.group({
      id_cui_colaborador: [
        { value: data.id_cui_colaborador, disabled: true },
        [Validators.required, Validators.pattern('^[0-9]{13}$')],
      ],
      nombres_colaborador: [data.nombres_colaborador, Validators.required],
      apellidos_colaborador: [data.apellidos_colaborador, Validators.required],
      fecha_nacimiento_colaborador: [fechaNacimiento, Validators.required],
      telefono_colaborador: [data.telefono_colaborador, Validators.required],
      correo_electronico_colaborador: [
        data.correo_electronico_colaborador,
        [Validators.required, Validators.email],
      ],
      empresas: [
        data.empresas.map(
          (empresa: { id_empresa: string }) => empresa.id_empresa
        ),
      ],
    });
    this.loadEmpresas();
  }
  loadEmpresas() {
    this.empresasService.getAll().subscribe(
      (empresas) => {
        this.empresas = empresas;
      },
      (error) => {
        console.error('Error al cargar las empresas', error);
      }
    );
  }

  onSubmit() {
    if (this.colaboradorForm.valid) {
      const updatedData = {
        ...this.colaboradorForm.getRawValue(),
        id_cui_colaborador: this.data.id_cui_colaborador,
      };

      this.colaboradoresService
        .update(this.data.id_cui_colaborador, updatedData)
        .subscribe(
          (response) => {
            const responseWithId = { ...response, id: 0 };

            console.log('Colaborador actualizado exitosamente', responseWithId);
            this.dialogRef.close(responseWithId);
          },
          (error) => {
            console.error('Error al actualizar colaborador', error);
          }
        );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
  formatDate(date: string): string {
    const newDate = new Date(date);
    return newDate.toISOString().split('T')[0];
  }
}
