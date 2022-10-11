import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  //variable:
  usuarios: any[] = [
    {
      rut: '11.222.333-4',
      nombre: 'Lalo',
      ap_paterno: 'Cura',
      fecha_nac: '2000-12-24',
      correo: 'administrador@duoc.cl',
      clave: 'administrador',
      tipo_usuario: 'administrador'
    },{
      rut: '18.999.000-1',
      nombre: 'Elvis',
      ap_paterno: 'Tek',
      fecha_nac: '1990-06-10',
      correo: 'alumno@duocuc.cl',
      clave: 'alumno',
      tipo_usuario: 'alumno'
    }
  ];

  //VAMOS A CREAR LA VARIABLE QUE SE ENCARGARÁ DE SABER SI TENGO UNA SESIÓN ACTIVA O NO:
  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router) { }

  //métodos:
  addUsuario(usuario) {
    if (this.getUsuario(usuario.rut) == undefined) {
      this.usuarios.push(usuario);
      return true;
    }
    return false;
  }

  getUsuario(rut) {
    return this.usuarios.find(usu => usu.rut == rut);
  }

  getUsuarios() {
    return this.usuarios;
  }

  updateUsuario(usuario) {
    let index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;
  }

  deleteUsuario(rut) {
    this.usuarios.forEach((usu, index) => {
      if (usu.rut == rut) {
        this.usuarios.splice(index, 1);
      }
    });
  }


  //métodos customer:
  loginUsuario(correo, clave) {
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
    if (usuarioLogin != undefined) {
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
    //return this.usuarios.find(usu => usu.correo == correo && usu.clave == clave);
  }
  getAuth(){
    return this.isAuthenticated.value;
  }
  logout(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }



  validarCorreo(correo){
    return this.usuarios.find(usu => usu.correo == correo);
  }
}
