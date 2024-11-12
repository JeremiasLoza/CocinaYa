import { BootstrapOptions, Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { FavoritesService } from '../../services/favorites.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})

export class CardComponent {
  isLogged = true;
  
  @Input() isHeartActive !: boolean;
  @Input()
   recipe!: Recipe;

  toggleHeart(): void{
    event?.stopPropagation();
    this.isHeartActive = !this.isHeartActive;
  }


}
