import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-character',
  styleUrls: ['./character.component.scss'],
  templateUrl: './character.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class CharacterComponent {}
