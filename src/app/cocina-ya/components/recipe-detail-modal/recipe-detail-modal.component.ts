import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-detail-modal',
  templateUrl: './recipe-detail-modal.component.html',
  styleUrls: ['./recipe-detail-modal.component.css']
})
export class RecipeDetailModalComponent {
  
  @Input() recipe!: Recipe; 
  @Input() index!: number | null; 
  @Input() recipes!: Recipe[]; 
  @Output() close = new EventEmitter<void>(); 

  closeModal(): void {
    this.close.emit(); 
  }

}
