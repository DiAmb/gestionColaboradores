import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpresasService } from 'src/app/servicios/empresas/empresas.service';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-edit-empresa',
  templateUrl: './edit-empresa.component.html',
  styleUrls: ['./edit-empresa.component.css'],
})
export class EditEmpresaComponent {
  empresaForm: FormGroup;
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService,
    private empresasService: EmpresasService,
    private dialogRef: MatDialogRef<EditEmpresaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empresaForm = this.fb.group({
      razon_social_empresa: [
        data?.razon_social_empresa || '',
        [Validators.required],
      ],
      nombre_comercial_empresa: [data?.nombre_comercial_empresa || ''],
      nit_empresa: [data?.nit_empresa || '', [Validators.required]],
      telefono_empresa: [data?.telefono_empresa || ''],
      correo_electronico_empresa: [
        data?.correo_electronico_empresa || '',
        [Validators.email],
      ],
      id_pais: ['', [Validators.required]],
      id_departamento: ['', [Validators.required]],
      id_municipio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadPaises();
    this.onChanges();

    if (this.data.ubicacion) {
      this.preloadLocation(this.data.ubicacion);
    }
  }

  loadPaises() {
    this.ubicacionService.getAllPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  preloadLocation(direccion: string) {
    const [pais, departamento, municipio] = direccion
      .split(',')
      .map((d) => d.trim());

    this.ubicacionService.getAllPaises().subscribe(
      (paises) => {
        this.paises = paises;

        const matchedPais = paises.find((p) => p.nombre_pais === pais);

        if (matchedPais) {
          this.empresaForm.patchValue({ id_pais: matchedPais.id_pais });
          this.ubicacionService
            .getDepartamentosByPais(matchedPais.id_pais)
            .subscribe(
              (departamentos) => {
                this.departamentos = departamentos;

                const matchedDepartamento = departamentos.find(
                  (d) => d.nombre_departamento === departamento
                );

                if (matchedDepartamento) {
                  this.empresaForm.patchValue({
                    id_departamento: matchedDepartamento.id_departamento,
                  });
                  this.ubicacionService
                    .getMunicipiosByDepartamento(
                      matchedDepartamento.id_departamento
                    )
                    .subscribe(
                      (municipios) => {
                        this.municipios = municipios;

                        const matchedMunicipio = municipios.find(
                          (m) => m.nombre_municipio === municipio
                        );

                        if (matchedMunicipio) {
                          this.empresaForm.patchValue({
                            id_municipio: matchedMunicipio.id_municipio,
                          });
                        }
                      },
                      (error) => {
                        console.error('Error al cargar municipios:', error);
                      }
                    );
                }
              },
              (error) => {
                console.error('Error al cargar departamentos:', error);
              }
            );
        }
      },
      (error) => {
        console.error('Error al cargar países:', error);
      }
    );
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
      const { id_pais, id_departamento, ...empresaData } =
        this.empresaForm.value;

      this.empresasService.update(this.data.id_empresa, empresaData).subscribe(
        (response) => {
          console.log('Empresa actualizada:', response);
          this.dialogRef.close({ id: 0 });
        },
        (error) => {
          console.error('Error al actualizar la empresa:', error);
        }
      );
    } else {
      console.log('Formulario inválido');
    }
  }
}
