import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.page.html',
  styleUrls: ['./mantenedor.page.scss'],
})
export class MantenedorPage implements OnInit {

  //VARIABLES PARA TRABAJAR MI STORAGE:
  datos: any[] = [];
  KEY_PERSONAS = 'personas';
  dato = {
    id: '',
    rut: '',
    nombre: ''
  };

  //EJEMPLO:
  tipo: string = '';

  constructor(private storage: StorageService, private loading: LoadingController) { }

  async ngOnInit() {
    await this.cargarDatos();
  }

  //MÉTODOS NECESARIOS PARA TRABAJAR EL STORAGE:
  async cargarDatos(){
    this.datos = await this.storage.getDatos(this.KEY_PERSONAS);
  }

  async registrar(){
    this.dato.id = '';
    var resp = await this.storage.agregar(this.KEY_PERSONAS, this.dato);
    if(resp){
      alert('REGISTRADO');
      await this.cargarDatos();
    }
  }

  async eliminar(identificador){
    await this.storage.eliminar(this.KEY_PERSONAS, identificador);
    await this.cargandoPantalla('eliminando...');
    await this.cargarDatos();
  }

  async cargar(identificador){
    this.dato = await this.storage.getDato(this.KEY_PERSONAS, identificador);
  }

  async modificar(){
    await this.storage.actualizar(this.KEY_PERSONAS, this.dato);
    await this.cargarDatos();
  }

  //LOADING:
  async cargandoPantalla(message){
    const cargando = await this.loading.create({
      message,
      duration: 3000,
      spinner: 'lines-small'
    });

    cargando.present();
  }


}
