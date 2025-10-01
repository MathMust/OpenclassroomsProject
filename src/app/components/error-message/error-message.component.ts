import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() message: string | null = null;
}
