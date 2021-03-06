import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor( public usuarioService: UsuarioService, public modelUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modelUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {

    this.usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarDesde( valor: number) {
    let desde = this.desde + valor;
    console.log(desde);
    if ( desde >= this.totalRegistros) {

      return;

    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string) {
    console.log(termino);

    if ( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.usuarioService.buscarUsuarios(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      console.log(this.usuarios);
    });
  }

  eliminarUsuario( usuario: Usuario) {

    if ( usuario['_id'] === this.usuarioService.usuario['_id']) {
      swal('No se pudo eliminar usuario', 'No puedes borrarte a ti mismo', 'error');
      return;
    }
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this file!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete)  => {
      if (willDelete) {
        this.usuarioService.borrarUsuario(usuario['_id'])
          .subscribe( borrado => {
            console.log(borrado);
            this.desde = 0;
            this.cargarUsuarios();
          });

      }
    });

  }

  guardarUsuario( usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
  mostrarModal( id: string) {
    this.modelUploadService.mostrarModal('usuario', id);
  }

}
