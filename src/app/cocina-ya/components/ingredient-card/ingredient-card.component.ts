import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.css'
})
export class IngredientCardComponent {

  @Input() ingredient : string = '';
  @Input() measure : string = '';
}
