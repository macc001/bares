import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import Swal from "sweetalert2";
import { BarModel } from "../../bar-negocio/model-bar/bar.model";
import { BarService } from "../../bar-negocio/services-bar/bar.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"]
})
export class RegistroComponent implements OnInit {
  bar: BarModel = new BarModel();
  atencionDias: string;
  atencionHoras: string;

  habilitadoBoolean = [
    { value: true, text: "Habilitado" },
    { value: false, text: "Desabilitado" }
  ];

  constructor(private barService: BarService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== null) {
      this.barService.getHeroe(id).subscribe((resp: BarModel) => {
        this.bar = resp;
        this.bar.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      title: "Espere",
      text: "Guardando información",
      type: "info",
      allowOutsideClick: false
    });
    Swal.showLoading();
    const atencion = {
      dias: this.atencionDias,
      horario: this.atencionHoras
    };
    this.bar.atencion = atencion;
    let peticion: Observable<any>;
    if (this.bar.id) {
      peticion = this.barService.actualizarHeroe(this.bar);
    } else {
      peticion = this.barService.crearHeroe(this.bar);
    }
    peticion.subscribe(resp => {
      Swal.fire({
        title: this.bar.nombre,
        text: "Se actualizó correctamente",
        type: "success"
      });
    });
    form.reset();
  }
}
