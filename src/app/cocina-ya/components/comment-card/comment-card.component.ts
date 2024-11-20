import { Component,Input } from '@angular/core';


@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent {

  @Input() comment !: { text: string, userId: string, date: string };

}
