import { Component, HostListener } from '@angular/core';
import { Themeservice } from '../../shared/services/themeservice';
import { Heronavbar } from "./heronavbar/heronavbar";
import { Herosection } from "./herosection/herosection";



@Component({
  selector: 'app-homepage',
  imports: [Heronavbar, Herosection],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  constructor(public themeService:Themeservice){}


}
