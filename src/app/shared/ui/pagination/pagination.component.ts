import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageControl } from '../../util/model/page-control'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{
  @Input() pageControl: PageControl = new PageControl;
  pages: number[] = [];
  @Output() goPage = new EventEmitter<number>();

  ngOnInit(): void {
    this.pages = Array(Math.floor(this.pageControl.count / 10)).fill(0).map((x,i) => i+1);
  }

  goToPage(page: number): void {
    this.goPage.emit(page);
  }
  goToNextPage(): void {
    this.goPage.emit(this.pageControl.page +1);
  }
  goToPrevPage(): void {
    this.goPage.emit(this.pageControl.page -1);
  }

}
