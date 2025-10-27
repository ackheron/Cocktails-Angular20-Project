import { Component } from '@angular/core';
import { Cocktails } from './components/cocktails/cocktails';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header, Footer, Cocktails],
})
export class App {}
