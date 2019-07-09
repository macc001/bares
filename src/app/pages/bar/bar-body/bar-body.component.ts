import { Component, OnInit } from "@angular/core";

import { BarService } from "../bar-negocio/services-bar/bar.service";
import { BarModel } from "../bar-negocio/model-bar/bar.model";

import Swal from "sweetalert2";

@Component({
  selector: "app-bar-body",
  templateUrl: "./bar-body.component.html",
  styleUrls: ["./bar-body.component.css"]
})
export class BarBodyComponent implements OnInit {
  bar: BarModel[] = [];
  cargando = false;

  constructor(private barService: BarService) {}

  ngOnInit() {
    this.cargando = true;
    this.barService.getHeroes().subscribe(resp => {
      this.bar = resp;
      this.cargando = false;
    });
  }

  borrarHeroe(barId: BarModel, i: number) {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Está seguro que desea borrar a ${barId.nombre}`,
      type: "question",
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.bar.splice(i, 1);
        this.barService.borrarHeroe(barId.id).subscribe();
      }
    });
  }
}
