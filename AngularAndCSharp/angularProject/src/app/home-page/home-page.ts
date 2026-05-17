
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home-page',
  imports: [CommonModule,RouterLink],
    standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
shows = [
  { title: 'The Midnight Tour: North America', date: '2025-07-12', location: 'Madison Square Garden, NY', image: 'assets/pic2.jpg' },
  { title: 'Static Shock: Live Reloaded', date: '2025-08-02', location: 'The O2 Arena, London', image: 'assets/pic3.jpg' },
  { title: 'Epic Fusion Festival', date: '2025-09-15', location: 'Red Rocks Amphitheatre, CO', image: 'assets/d62a2850c412f326114949b347591471.jpg' },
];
}