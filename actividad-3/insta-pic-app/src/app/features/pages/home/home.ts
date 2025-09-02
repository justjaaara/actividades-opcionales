import { Component } from '@angular/core';
import { Navbar } from '../../../shared/components/navbar/navbar';
import { Floatinhero } from '../../../components/floatinhero/floatinhero';
import { Gallery } from '../../../components/gallery/gallery';

@Component({
  selector: 'app-home',
  imports: [Navbar, Floatinhero, Gallery],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
