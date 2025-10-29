import { Component } from '@angular/core';
import { CocktailDetails } from './components/cocktail-details/cocktail-details';
import { CocktailsList } from './components/cocktails-list/cocktails-list';

@Component({
  selector: 'app-cocktails',
  imports: [CocktailsList, CocktailDetails],
  templateUrl: './cocktails.html',
  styleUrl: './cocktails.scss',
})
export class Cocktails {}
