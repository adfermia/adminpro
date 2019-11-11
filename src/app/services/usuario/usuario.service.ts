import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
// tslint:disable-next-line: import-blacklist
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {

    console.log('Servicio de usuario listo');
    this.cargarStorage();
   }

   guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
   }

   crearUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario';

     return this.http.post( url, usuario).pipe(

                    map( (resp: any) => {

                      swal('Usuario creado', usuario.email, 'success');
                      return resp.usuario;
                    }));

   }

   logout() {
      this.usuario = null;
      this.token = '';

      localStorage.removeItem('token');
      localStorage.removeItem('usuario');

      this.router.navigate(['/login']);
   }

   loginGoogle( token: string) {

    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token}).pipe(
      map((resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
      }) );
   }

   cargarStorage() {
     if ( localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario')) ;
     } else {
       this.token = '';
       this.usuario = null;
     }
   }

   login(usuario: Usuario, recuerdame: boolean) {

    if ( recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        return true;
      }));

   }

   estaLogeado() {
     return (this.token.length > 5) ? true : false;
   }


   actualizarUsuario(usuario: Usuario) {
     console.log(usuario['_id']);
     // tslint:disable-next-line: no-string-literal
     let url = URL_SERVICIOS + '/usuario/' + usuario['_id'];
     url += '?token=' + this.token;

     return this.http.put(url, usuario).pipe(
       map((resp: any) => {
          let usuarioDB: Usuario = resp.usuario;
          // this.usuario = resp.usuario;
          this.guardarStorage(usuarioDB.id, this.token, usuarioDB);
          swal('Usuario actualizado', usuario.nombre, 'success');
          return true;
       })
     );
   }
   cambiarImagen( archivo: File, id: string) {
     // NOSE SI ES USUARIO O USUARIOS


      this.subirArchivoService.subirArchivo(archivo, 'usuario', id)
      .then( (resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch( resp => {
        console.log(resp);
      });
   }
}
