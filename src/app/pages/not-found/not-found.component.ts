import { Component, OnInit } from '@angular/core';
import { ErrorMessageComponent } from "src/app/components/error-message/error-message.component";
import { BtnReturnHomeComponent } from "src/app/components/btn-return-home/btn-return-home.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    ErrorMessageComponent,
    BtnReturnHomeComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  message: string = "This page does not exist. Please return to the homepage.";

  constructor() { }

  ngOnInit(): void {
  }

}
