import { Component, OnInit} from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit {
  isLogged = false;
  
  categoriesName: String[] = [];
  constructor(private categoryService : CategoryService){}

  ngOnInit(){
    
  }


}
