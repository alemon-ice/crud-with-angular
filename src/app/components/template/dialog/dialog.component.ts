import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
  message: string;
  onConfirm: () => void;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  title: string = '';
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }

  confirm() {
    this.data.onConfirm();
  }
}
