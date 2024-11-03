import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent  {
  isHeartActive = false;

  @Input()
   recipe!: Recipe;

  toggleHeart(): void{
    this.isHeartActive = !this.isHeartActive;
  }

}
