import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor( public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;

  }

  ngOnInit() {
  }

  guardar( usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google) {
        this.usuario.email = usuario.email;

      }

    this.usuarioService.actualizarUsuario( this.usuario )
                        .subscribe();
  }

  seleccionImagen( archivo) {
    if ( !archivo) {
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    // Cambio el .id por ['_id'], nose porque no me coge el id pero al pasarlo asi ya funciona correctamente
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario['_id']);
  }

}
