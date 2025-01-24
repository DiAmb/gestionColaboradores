import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/servicios/empresas/empresas.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEmpresaComponent } from 'src/app/dialogs/add-empresa/add-empresa.component';
import { EditEmpresaComponent } from 'src/app/dialogs/edit-empresa/edit-empresa.component';
import { UbicacionService } from 'src/app/servicios/ubicacion/ubicacion.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {
  displayedColumns: string[] = [
    'id_empresa',
    'razon_social_empresa',
    'nombre_comercial_empresa',
    'nit_empresa',
    'telefono_empresa',
    'correo_electronico_empresa',
    'ubicacion',
    'actions',
  ];
  dataSource: any[] = [];

  constructor(
    private empresasService: EmpresasService,
    private ubicacionService: UbicacionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmpresas();
  }

  loadEmpresas() {
    this.empresasService.getAll().subscribe({
      next: (data) => {
        const ubicaciones$ = data.map((empresa: any) =>
          this.ubicacionService.getUbicacionCompleta(empresa.id_municipio)
        );

        forkJoin(ubicaciones$).subscribe({
          next: (ubicaciones) => {
            this.dataSource = data.map((empresa: any, index: number) => ({
              ...empresa,
              ubicacion: ubicaciones[index],
            }));
          },
          error: (err) => {
            console.error('Error al cargar las ubicaciones:', err);
            alert('Error al cargar las ubicaciones de las empresas.');
          },
        });
      },
      error: (err) => {
        console.error('Error al cargar las empresas:', err);
        alert('Error al cargar los datos de las empresas.');
      },
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddEmpresaComponent, {
      width: '30%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id == 0) {
        this.loadEmpresas();
        alert(`Empresa agregada exitosamente`);
      }
    });
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(EditEmpresaComponent, {
      width: '30%',
      height: '80%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id == 0) {
        this.loadEmpresas();
        alert(`Actualización exitosa`);
      }
    });
  }

  deleteRow(row: any) {
    if (
      confirm(
        `¿Está seguro de que desea eliminar la empresa ${row.nombre_comercial_empresa}?`
      )
    ) {
      this.empresasService.delete(row.id_empresa).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(
            (empresa) => empresa.id_empresa !== row.id_empresa
          );
          alert(`Empresa eliminada: ${row.nombre_comercial_empresa}`);
        },
        error: (err) => {
          console.error('Error al eliminar empresa:', err);
          alert('Error al eliminar la empresa.');
        },
      });
    }
  }
}
