import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit{
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let categoryName = this.route.snapshot.paramMap.get("category");
    console.log(categoryName);
  }
}
