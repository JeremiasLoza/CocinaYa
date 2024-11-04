import { Component, Input } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.css']
})
export class RecipeDetailModalComponent {
  @Input() recipes: Recipe[] = [];
  @Input() isOpen = true;

  currentIndex = 0;


  closeModal() {
    this.isOpen = false;
  }



}
