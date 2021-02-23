import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { TextAnswerService } from 'src/app/services/text-answer.service';
import { ModalData } from 'src/models/modal-data.model';
import { TextAnswerQuestion } from 'src/models/text-answer/text-answer-question';

@Component({
  selector: 'app-text-answer-card',
  templateUrl: './text-answer-card.component.html',
  styleUrls: ['./text-answer-card.component.css'],
})
export class TextAnswerCardComponent implements OnInit {
  @Input() textAnswerQuestion: TextAnswerQuestion;
  @Input() index: number;
  @Input() questionId: number;

  constructor(
    private textService: TextAnswerService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {}

  deleteTextAnswer(textAnswer: TextAnswerQuestion, index: number) {
    const data: ModalData = {
      item: 'this Card',
      index: textAnswer._id,
    };
    this.openDialog(data);
  }

  private openDialog(data: ModalData): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((id) => {
      console.log(id);
      if (id != undefined) {
        this.textService.deleteTextAnswer(id, this.questionId);
      }
    });
  }
}
