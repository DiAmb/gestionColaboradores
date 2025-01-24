import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartamentoComponent } from 'src/app/dialogs/add-departamento/add-departamento.component';
import { AddMunicipioComponent } from 'src/app/dialogs/add-municipio/add-municipio.component';
import { AddPaisComponent } from 'src/app/dialogs/add-pais/add-pais.component';
import { EditDepartamentoComponent } from 'src/app/dialogs/edit-departamento/edit-departamento.component';
import { EditMunicipioComponent } from 'src/app/dialogs/edit-municipio/edit-municipio.component';
import { EditPaisComponent } from 'src/app/dialogs/edit-pais/edit-pais.component';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css'],
})
export class UbicacionComponent implements OnInit {
  paises: any[] = [];
  departamentos: any[] = [];
  municipios: any[] = [];
  selectedPais: any = null;
  selectedDepartamento: any = null;

  paisColumns = ['id_pais', 'nombre_pais', 'acciones'];
  departamentoColumns = ['id_departamento', 'nombre_departamento', 'acciones'];
  municipioColumns = ['id_municipio', 'nombre_municipio', 'acciones'];

  constructor(
    private ubicacionService: UbicacionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPaises();
  }

  loadPaises(): void {
    this.ubicacionService.getAllPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  selectPais(pais: any): void {
    this.selectedPais = pais;
    this.selectedDepartamento = null;
    this.municipios = [];
    this.ubicacionService
      .getDepartamentosByPais(pais.id_pais)
      .subscribe((data) => {
        this.departamentos = data;
        console.log(data);
      });
  }

  selectDepartamento(departamento: any): void {
    this.selectedDepartamento = departamento;
    this.ubicacionService
      .getMunicipiosByDepartamento(departamento.id_departamento)
      .subscribe((data) => (this.municipios = data));
  }

  // Mapeo de tipos de diálogos a las funciones de recarga
  private reloadMap = {
    pais: this.loadPaises.bind(this),
    departamento: this.loadDepartamentos.bind(this),
    municipio: this.loadMunicipios.bind(this),
  };

  openDialog(type: 'pais' | 'departamento' | 'municipio'): void {
    let dialogRef;
    const dialogConfig = {
      width: '300px',
      data: {},
    };

    // Configuramos los datos según el tipo
    switch (type) {
      case 'pais':
        dialogRef = this.dialog.open(AddPaisComponent, dialogConfig);
        break;
      case 'departamento':
        dialogConfig.data = this.selectedPais;
        dialogRef = this.dialog.open(AddDepartamentoComponent, dialogConfig);
        break;
      case 'municipio':
        dialogConfig.data = this.selectedDepartamento;
        dialogRef = this.dialog.open(AddMunicipioComponent, dialogConfig);
        break;
      default:
        break;
    }

    dialogRef?.afterClosed().subscribe(() => {
      const reloadFunction = this.reloadMap[type];
      if (reloadFunction) {
        reloadFunction();
      }
    });
  }

  editPais(pais: any): void {
    const dialogRef = this.dialog.open(EditPaisComponent, {
      width: '300px',
      data: pais,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadPaises();
    });
  }

  deletePais(id: number): void {
    const confirmationMessage =
      '¡Atención! Al eliminar este país, se eliminarán todos los departamentos, municipios y empresas asociadas. ¿Estás seguro de que deseas continuar?';

    if (confirm(confirmationMessage)) {
      this.ubicacionService.deletePais(id).subscribe(() => {
        this.loadPaises();
      });
    }
  }

  editDepartamento(departamento: any): void {
    const dialogRef = this.dialog.open(EditDepartamentoComponent, {
      width: '300px',
      data: departamento,
    });
    dialogRef?.afterClosed().subscribe(() => {
      this.selectPais(this.selectedPais);
    });
  }
  deleteDepartamento(id: number): void {
    const confirmationMessage =
      '¡Atención! Al eliminar este departamento, se eliminarán todos los municipios y empresas asociadas. ¿Estás seguro de que deseas continuar?';

    if (confirm(confirmationMessage)) {
      this.ubicacionService.deleteDepartamento(id).subscribe(() => {
        this.selectPais(this.selectedPais);
      });
    }
  }

  editMunicipio(municipio: any): void {
    const dialogRef = this.dialog.open(EditMunicipioComponent, {
      width: '300px',
      data: municipio,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.selectDepartamento(this.selectedDepartamento);
    });
  }

  deleteMunicipio(id: number): void {
    const confirmationMessage =
      '¡Atención! Al eliminar este municipio, se eliminarán los registros asociados, como las empresas vinculadas a él. ¿Estás seguro de que deseas continuar?';

    if (confirm(confirmationMessage)) {
      this.ubicacionService.deleteMunicipio(id).subscribe(() => {
        this.selectDepartamento(this.selectedDepartamento);
      });
    }
  }

  loadDepartamentos(): void {
    if (this.selectedPais && this.selectedPais.id_pais) {
      this.ubicacionService
        .getDepartamentosByPais(this.selectedPais.id_pais)
        .subscribe((data) => {
          this.departamentos = data;
        });
    }
  }

  loadMunicipios(): void {
    if (
      this.selectedDepartamento &&
      this.selectedDepartamento.id_departamento
    ) {
      this.ubicacionService
        .getMunicipiosByDepartamento(this.selectedDepartamento.id_departamento)
        .subscribe((data) => {
          this.municipios = data;
        });
    }
  }
}
