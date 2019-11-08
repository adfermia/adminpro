import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  recuerdame: boolean = false;
  auth2: any;
  constructor(public router: Router, public userService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }

  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '912787213017-um1htis38j7tog0k3juot839ousr73il.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  ingresar( forma: NgForm) {

    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this.userService.login(usuario, forma.value.recuerdame).subscribe( correcto => {
      this.router.navigate(['/dashboard']);
    });
    // this.router.navigate(['/dashboard']);
  }

        attachSignin( element ) {

          this.auth2.attachClickHandler( element, {}, (googleUser) => {
            let token = googleUser.getAuthResponse().id_token;
            // let profile = googleUser.getBasicProfile();


            this.userService.loginGoogle(token).subscribe( resp => {
              window.location.href = '#/dashboard';
            });
          });
        }
}
