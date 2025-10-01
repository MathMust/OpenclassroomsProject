import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-btn-return-home',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './btn-return-home.component.html',
  styleUrl: './btn-return-home.component.scss'
})
export class BtnReturnHomeComponent {

  constructor(private router: Router) { }

  goHome(): void {
    this.router.navigate(['/']);
  }

}
