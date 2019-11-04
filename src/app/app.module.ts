
// Como vemos este modulo esta mucho mas limpio y sin tantas lineas de codigo gracias a la creacion
// de modulos independientes como el PagesModule

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Modulos
import { PagesModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
// Rutas
import { APP_ROUTES } from './app.routes';

import { FormsModule } from '@angular/forms';


// Servicios



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    BrowserModule,
    PagesModule,
    APP_ROUTES,
    FormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
