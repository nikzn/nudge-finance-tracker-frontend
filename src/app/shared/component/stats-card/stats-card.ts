import { Component, input } from '@angular/core';
import { CommonModule } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

interface statsCard{
  label:string,
  value:string|number,
  color?:string
}

@Component({
  selector: 'app-stats-card',
  imports: [CommonModule],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
})
export class StatsCard {
 stats = input<statsCard>()

}
