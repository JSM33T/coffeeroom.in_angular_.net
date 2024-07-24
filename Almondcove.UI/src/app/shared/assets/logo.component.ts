import { Component, OnDestroy, OnInit } from '@angular/core';
import {destroyParallax, initParallax} from '../../library/invokers/parallax';

@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styles: `.rotating-svg {
        animation: rotate 2s linear infinite;
      }
      
      @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      `
})
export class LogoComponent implements OnInit ,OnDestroy{
    ngOnInit(): void {
        initParallax();
    }

    ngOnDestroy(): void {
        destroyParallax();
    }

}
