import { Component, OnInit } from '@angular/core';
import { ColaboradoresService } from 'src/app/servicios/colaboradores/colaboradores.service';
import { map } from 'rxjs';
import { AddColaboradorComponent } from 'src/app/dialogs/add-colaborador/add-colaborador.component';
import { MatDialog } from '@angular/material/dialog';
import { EditColaboradorComponent } from 'src/app/dialogs/edit-colaborador/edit-colaborador.component';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'],
})
export class ColaboradoresComponent implements OnInit {
  displayedColumns: string[] = [
    'id_cui_colaborador',
    'nombres_colaborador',
    'apellidos_colaborador',
    'edad_colaborador',
    'telefono_colaborador',
    'correo_electronico_colaborador',
    'nombre_comercial_empresa',
    'actions',
  ];
  dataSource: any[] = [];

  constructor(
    private colaboradoresService: ColaboradoresService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadColaboradores();
  }

  loadColaboradores() {
    this.colaboradoresService.getAll().subscribe({
      next: (data) => {
        this.dataSource = data.map((colaborador: any) => ({
          ...colaborador,
          edad_colaborador: this.calcularEdad(
            colaborador.fecha_nacimiento_colaborador
          ),
          nombre_comercial_empresa: colaborador.empresas
            ? colaborador.empresas
                .map((e: any) => e.nombre_comercial_empresa)
                .join(', ')
            : '',
        }));
      },
      error: (err) => {
        console.error('Error al cargar colaboradores:', err);
        alert('Error al cargar los datos de los colaboradores.');
      },
    });
  }

  editRow(row: any) {
    const dialogRef = this.dialog.open(EditColaboradorComponent, {
      width: '30%',
      height: '80%',
      data: row,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id == 0) {
        this.loadColaboradores();
        alert(`Actualizacion exitosa`);
      }
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddColaboradorComponent, {
      width: '30%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.id == 0) {
        this.loadColaboradores();
        alert(`Agregado exitosamente`);
      }
    });
  }
  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  deleteRow(row: any) {
    if (
      confirm(
        `¿Está seguro de que desea eliminar a ${row.nombres_colaborador}?`
      )
    ) {
      this.colaboradoresService.delete(row.id_cui_colaborador).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(
            (colaborador) =>
              colaborador.id_cui_colaborador !== row.id_cui_colaborador
          );
          alert(`Eliminado: ${row.nombres_colaborador}`);
        },
        error: (err) => {
          console.error('Error al eliminar colaborador:', err);
          alert('Error al eliminar el colaborador.');
        },
      });
    }
  }
}
