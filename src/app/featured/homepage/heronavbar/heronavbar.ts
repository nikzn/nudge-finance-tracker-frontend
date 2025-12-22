import { Component } from '@angular/core';
import { Themeservice } from '../../../shared/services/themeservice';
import { RouterLink } from '@angular/router';
import { Select } from 'primeng/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-heronavbar',
  imports: [RouterLink,Select,FormsModule],
  templateUrl: './heronavbar.html',
  styleUrl: './heronavbar.css',
})
export class Heronavbar {
  selectedTheme:string=''
  themeList:any[] = [
{ label: 'Blue', value: 'blue' },
  { label: 'White Luxe', value: 'white' },
  { label: 'White Minimal', value: 'white-minimal' },
  { label: 'White Warm', value: 'white-warm' },

  { label: 'Purple', value: 'purple' },
  { label: 'Green', value: 'green' },
  { label: 'Orange', value: 'orange' },

  { label: 'Midnight Blue', value: 'midnight' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Royal Purple', value: 'royal' },
  { label: 'Slate', value: 'slate' },
  { label: 'Rose Gold', value: 'rose-gold' },
  { label: 'Teal', value: 'teal' },
  { label: 'Crimson', value: 'crimson' },
  { label: 'Gold', value: 'gold' }
]

  constructor(public themeService:Themeservice){
    this.selectedTheme = this.themeService.themeColor()
  }

onThemeChange(){
  this.themeService.onToggleThemeColor(this.selectedTheme)
  
}

}
