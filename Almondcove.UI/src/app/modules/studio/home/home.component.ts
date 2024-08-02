import { Component, OnInit } from '@angular/core';
import Initswiper from '../../../library/invokers/swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    Initswiper();
  }

}
