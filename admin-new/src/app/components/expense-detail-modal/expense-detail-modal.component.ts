import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expense-detail-modal',
  standalone: true,
  imports: [],
  templateUrl: './expense-detail-modal.component.html',
  styleUrl: './expense-detail-modal.component.css'
})
export class ExpenseDetailModalComponent implements OnInit, OnDestroy, OnChanges {

  @Input({ required: true }) expenseId!: number | string;
  @Input() show?: boolean;

  @Output() onClose = new EventEmitter();

  @ViewChild("expense_detail") expenseDetailDialog!: ElementRef;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["show"].currentValue)
      this.expenseDetailDialog.nativeElement.show();
  }

  close() {
    this.onClose.emit(this.show);
  }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }


}
