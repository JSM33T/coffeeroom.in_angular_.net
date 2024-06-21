import { AfterViewInit, Component, OnInit } from '@angular/core';
import InitLightGallery from '../../../library/invokers/light-gallery';
import InitAnimateOnScroll from '../../../library/invokers/animate-on-scroll';
import Initswiper from '../../../library/invokers/swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {

    InitLightGallery();
  }



}
