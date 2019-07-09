import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app.routes";

import { AppComponent } from "./app.component";
import { BarBodyComponent } from "./pages/bar/bar-body/bar-body.component";
import { RegistroComponent } from './pages/bar/bar-body/registro/registro.component';

@NgModule({
  declarations: [AppComponent, BarBodyComponent, RegistroComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
