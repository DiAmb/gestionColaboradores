import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmpresasService } from 'src/app/servicios/empresas/empresas.service';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-add-empresa',
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css'],
})
export class AddEmpresaComponent {
  empresaForm: FormGroup;
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    private empresasService: EmpresasService,
    private dialogRef: MatDialogRef<AddEmpresaComponent>
  ) {
    this.empresaForm = this.fb.group({
      razon_social_empresa: ['', [Validators.required]],
      nombre_comercial_empresa: [''],
      nit_empresa: ['', [Validators.required]],
      telefono_empresa: [''],
      correo_electronico_empresa: ['', [Validators.email]],
      id_pais: ['', [Validators.required]],
      id_departamento: ['', [Validators.required]],
      id_municipio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadPaises();
    this.onChanges();
  }

  loadPaises() {
    this.ubicacionService.getAllPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  onChanges() {
    this.empresaForm.get('id_pais')?.valueChanges.subscribe((idPais) => {
      this.empresaForm.patchValue({
        id_departamento: null,
        id_municipio: null,
      });
      this.departamentos = [];
      this.municipios = [];
      if (idPais) {
        this.ubicacionService
          .getDepartamentosByPais(idPais)
          .subscribe((data) => (this.departamentos = data));
      }
    });

    this.empresaForm
      .get('id_departamento')
      ?.valueChanges.subscribe((idDepartamento) => {
        this.empresaForm.patchValue({ id_municipio: null });
        this.municipios = [];
        if (idDepartamento) {
          this.ubicacionService
            .getMunicipiosByDepartamento(idDepartamento)
            .subscribe((data) => (this.municipios = data));
        }
      });
  }

  onSubmit() {
    if (this.empresaForm.valid) {
      delete this.empresaForm.value.id_pais;
      delete this.empresaForm.value.id_departamento;
      this.empresasService
        .create(this.empresaForm.value)
        .subscribe((response) => {
          console.log('Empresa creada:', response);
          this.dialogRef.close({ id: 0 });
        });
    } else {
      console.log('Formulario inválido');
    }
  }
}
