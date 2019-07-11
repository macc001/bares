import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BarModel } from "../model-bar/bar.model";
import { map, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BarService {
  private url = "https://test-21441.firebaseio.com";

  constructor(private http: HttpClient) {}

  crearHeroe(bar: BarModel) {
    console.log(JSON.parse(bar.estado));
    const barTemp = {
      id: bar.id,
      atencion: bar.atencion,
      descripcion: bar.descripcion,
      direccion: bar.direccion,
      estado: JSON.parse(bar.estado),
      foto: bar.foto,
      habierto: JSON.parse(bar.habierto),
      nombre: bar.nombre,
      telefono: bar.telefono,
      ubicacion: bar.ubicacion,
      votacion: +bar.votacion
    };
    return this.http.post(`${this.url}/bares.json`, barTemp).pipe(
      map((resp: any) => {
        bar.id = resp.name;
        return bar;
      })
    );
  }

  actualizarHeroe(heroe: BarModel) {
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/bares/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/bares/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/bares/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/bares.json`).pipe(
      map(this.crearArreglo),
      delay(0)
    );
  }

  private crearArreglo(heroesObj: object) {
    const heroes: BarModel[] = [];
    Object.keys(heroesObj).forEach(key => {
      const heroe: BarModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
  }
}
