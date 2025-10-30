import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cocktails-list',
  imports: [],
  templateUrl: './cocktails-list.html',
  styleUrl: './cocktails-list.scss',
})
export class CocktailsList {}
