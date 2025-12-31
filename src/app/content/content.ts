import { Component } from '@angular/core';
import { Sidemenu } from "../sidemenu/sidemenu";
import { RouterOutlet } from "../../../node_modules/@angular/router/types/_router_module-chunk";

@Component({
  selector: 'app-content',
  imports: [Sidemenu],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {

}
