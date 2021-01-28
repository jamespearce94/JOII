import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sh-favourite-toggle',
  templateUrl: './favourite-toggle.component.html',
  styleUrls: ['./favourite-toggle.component.scss'],
})
export class FavouriteToggleComponent implements OnInit {
  // Any property used in the view is public to stop AOT compilation problems.
  @Input() public selected: boolean;
  @Input() public movieId: number;
  @Input() public readonly: boolean = false;
  @Input() public size: number = 20;

  @Output() public onChange: EventEmitter<boolean> = new EventEmitter(); // Presentational component, outputs event to avoid logic in this component.

  constructor() {}

  public ngOnInit(): void {}

  public onToggle() {
    if (this.readonly) {
      return;
    }
    this.selected = !this.selected;
    this.onChange.emit(this.selected);
  }
}
