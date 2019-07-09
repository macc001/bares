import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BarBodyComponent } from "./pages/bar/bar-body/bar-body.component";
import { RegistroComponent } from "./pages/bar/bar-body/registro/registro.component";

const routes: Routes = [
  { path: "bar", component: BarBodyComponent },
  { path: "bar/nuevo", component: RegistroComponent },
  { path: "bar/:id", component: RegistroComponent },
  { path: "**", redirectTo: "bar" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
