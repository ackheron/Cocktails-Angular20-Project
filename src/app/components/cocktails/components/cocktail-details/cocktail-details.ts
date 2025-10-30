import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Cocktail } from 'app/shared/interfaces/cocktails.interface.js';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cocktail-details',
  imports: [],
  templateUrl: './cocktail-details.html',
  styleUrl: './cocktail-details.scss',
})
export class CocktailDetails {
  cocktail: Cocktail = {
    imageUrl:
      'https://static.750g.com/images/1200-675/dfe52623942a8b2e6b4f1e1715a42570/servez-et-degustez.jpg',
    name: 'Mojito',
    description: `Le mojito est un cocktail classique cubain, idéal pour les moments de détente. Composé de rhum blanc, de feuilles de menthe fraîche, de jus de citron vert, de sucre, d'eau gazeuse et de glace pilée, il offre un équilibre parfait entre fraîcheur, acidité et douceur, avec des arômes rafraîchissants et tropicaux.`,
  };
}
