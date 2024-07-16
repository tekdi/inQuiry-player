import { Component, Input, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { arrangeSequenceQuestion } from './data'; 
type Layout = 'VERTICAL' | 'HORIZONTAL' | 'DEFAULT';

@Component({
  selector: 'quml-asq-options',
  templateUrl: './asq-options.component.html',
  styleUrls: ['./asq-options.component.scss'],
})
export class AsqOptionsComponent implements OnInit {
  layout: Layout = 'DEFAULT';
  todo = arrangeSequenceQuestion.interactions.response1.options.map(option => option.label);

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.setLayout();
  }

  setLayout(): void {
    if (arrangeSequenceQuestion.templateId === 'asq-vertical') {
      this.layout = 'VERTICAL';
    } else if (arrangeSequenceQuestion.templateId === 'asq-horizontal') {
      this.layout = 'HORIZONTAL';
    } else {
      console.error('Invalid or undefined templateId');
      this.layout = 'DEFAULT';
    }
  }
}
