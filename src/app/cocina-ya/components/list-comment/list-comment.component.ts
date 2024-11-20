import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrl: './list-comment.component.css'
})
export class ListCommentComponent implements OnInit {

  comments: any [] = [];

  constructor(private commentService : CommentService){}

  ngOnInit(): void {
    /// el id de la reseta lo voy obtener luego que lo intregre en el comente modal
   this.commentService.getCommentByRecipeId("52771").subscribe(data =>{
    console.log('comentarios recibidos: ', data);
    this.comments = data;
   });
  }


}
