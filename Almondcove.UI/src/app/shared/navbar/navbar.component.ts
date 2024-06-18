import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { initializeNavbarSticky } from '../../library/invokers/sticky-navbar';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles:`@import 'aos/dist/aos.css';`
})
export class NavbarComponent implements OnInit{
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    InitAnimateOnScroll();
  }

 
  toggleNavbar() {
    const navbar = this.el.nativeElement.querySelector('#navbarNav');
    const navToggler = this.el.nativeElement.querySelector('#navToggler');
    const isExpanded = navToggler.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      this.renderer.removeClass(navbar, 'show');
      this.renderer.setAttribute(navToggler, 'aria-expanded', 'false');
    } else {
      this.renderer.addClass(navbar, 'show');
      this.renderer.setAttribute(navToggler, 'aria-expanded', 'true');
    }
  }
}
