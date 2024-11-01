import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe';
import { Input } from '@angular/core';

@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.css']
})
export class ListRecipesComponent {
 

  @Input() recipesList: Recipe[] = [];



}