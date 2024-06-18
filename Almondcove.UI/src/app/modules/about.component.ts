import { Component, OnInit } from '@angular/core';
import InitAnimateOnScroll from '../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../library/invokers/smooth-scroll';
import initParallax from '../library/invokers/parallax';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-about',
  template: `
    <section class=" position-relative pt-lg-3 pt-xl-4 pt-xxl-5">
      <div
        class="bg-primary bg-opacity-10 rounded-circle position-absolute start-50 d-none d-lg-block"
        style="bottom: 220px; width: 480px; height: 480px; margin-left: -240px;"
        data-aos="zoom-in"
        data-aos-duration="700"
        data-aos-delay="200"
        data-aos-offset="300"
      ></div>
      <div
        class="container position-relative z-5 mt-2 pt-5 pb-2 pb-sm-4 pb-lg-5"
      >
        <div
          class="display-3 text-center text-primary mx-auto pt-5 my-2 my-sm-4"
          style="max-width: 680px;"
        >
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="300.000000pt"
            height="70.000000pt"
            viewBox="0 0 1000.000000 300.000000"
            preserveAspectRatio="xMidYMid meet"
            style="margin-left: 0px;"
          >
            <g
              transform="translate(0.000000,275.000000) scale(0.100000,-0.100000)"
              fill="currentColor"
              stroke="none"
            >
              <path
                d="M520 2725 c0 -3 0 -104 0 -225 0 -121 0 -224 0 -230 0 -6 84 -10 230 -10 l231 0 -3 -787 c-4 -900 0 -858 -87 -944 -71 -71 -168 -85 -263 -38 -43 22 -73 62 -104 138 l-23 56 -250 3 c-138 1 -251 -1 -251 -5 0 -5 11 -48 24 -98 47 -173 117 -297 228 -401 188 -175 476 -231 735 -142 132 45 199 87 281 173 103 108 159 228 187 400 12 75 15 262 15 1103 l0 1012 -475 0 c-261 0 -475 -2 -475 -5z"
              ></path>
              <path
                d="M2305 2734 c-326 -53 -572 -272 -639 -571 -21 -92 -21 -270 0 -371 33 -164 134 -314 272 -405 79 -53 217 -116 397 -182 201 -74 271 -111 341 -180 74 -73 96 -129 96 -242 -1 -96 -31 -162 -107 -231 -73 -67 -154 -97 -260 -96 -102 1 -167 28 -229 94 -61 66 -88 121 -111 232 l-5 28 -256 0 -257 0 7 -60 c21 -187 95 -345 226 -484 176 -186 400 -275 664 -263 198 9 362 65 508 176 127 96 233 262 280 436 31 118 31 338 -1 450 -82 290 -258 442 -689 594 -95 34 -198 74 -230 90 -70 35 -146 115 -161 167 -14 52 -14 147 1 198 18 60 99 138 163 157 100 29 212 9 275 -48 54 -48 76 -86 97 -168 l19 -70 244 0 244 0 -3 49 c-8 132 -80 311 -171 423 -96 119 -250 219 -395 258 -60 16 -263 28 -320 19z"
              ></path>
              <path
                d="M3447 2481 l-187 -269 2 -417 3 -417 160 233 160 234 3 -907 c1 -533 6 -908 11 -908 5 0 168 233 362 518 775 1134 880 1287 889 1290 7 2 10 -320 10 -912 l0 -916 250 0 250 0 0 1370 0 1370 -232 0 -233 0 -390 -560 c-214 -307 -393 -559 -397 -559 -5 -1 -8 251 -8 559 l0 560 -232 0 -233 -1 -188 -268z"
              ></path>
              <path
                d="M5445 2727 c-3 -7 -4 -114 -3 -237 l3 -225 483 -3 482 -2 0 -330 0 -330 -272 -2 -273 -3 0 -235 0 -235 273 -3 272 -2 0 -320 c0 -249 -3 -320 -12 -320 -7 0 -220 0 -473 0 -253 0 -466 -4 -473 -8 -9 -7 -12 -61 -10 -238 l3 -229 738 -3 737 -2 -2 1367 -3 1368 -733 3 c-588 2 -734 0 -737 -11z"
              ></path>
              <path
                d="M7002 2503 l3 -238 478 -3 477 -2 0 -330 0 -330 -267 -2 -268 -3 -3 -237 -2 -238 270 0 270 0 -2 -320 -3 -321 -475 -2 -475 -2 -3 -237 -2 -238 735 0 735 0 0 1370 0 1370 -735 0 -735 0 2 -237z"
              ></path>
              <path
                d="M8557 2723 c-4 -3 -7 -618 -7 -1365 l0 -1358 255 0 255 0 0 1130 0 1130 253 2 252 3 3 233 2 232 -503 0 c-277 0 -507 -3 -510 -7z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </section>

    <section class="container pt-5 mt-lg-3 mt-xl-4 mt-xxl-5">
      <div class="pt-4 pt-sm-3 mt-md-3">
        <h1
          class="pb-3 mb-2 mb-sm-3 mb-lg-4"
          data-aos="flip-up"
          data-aos-duration="300"
        >
          Hi this is <span class="text-primary">Jass</span>
        </h1>
        <p class="fs-lg" data-aos="fade-in" data-aos-duration="500">
          &nbsp;&nbsp;&nbsp;&nbsp;I am a full-stack web developer with a strong
          focus on writing efficient business logic, specializing in
          <span _ngcontent-ng-cli-universal-c5="" class="text-primary"
            >.NET, C#</span
          >
          (MVC,Web Api's,Razor Pages). I have successfully crafted and
          implemented intricate web applications that drive efficiency and
          results for businesses. Proficient in UI design using Bootstrap and
          have a command over
          <span _ngcontent-ng-cli-universal-c5="" class="text-primary"
            >Vue Js</span
          >, allowing me to create visually appealing and highly responsive user
          interfaces. I'm also in the early stages of my journey with
          <span _ngcontent-ng-cli-universal-c5="" class="text-primary"
            >Angular</span
          >, eagerly learning and expanding my skill set to become well-versed
          in this popular front-end framework.
        </p>
        <div class="d-flex">
          <div class="d-flex">
            <a
              *ngFor="let link of socialLinks"
              class="btn btn-outline-secondary btn-icon btn-sm {{
                'btn-' + link.platform.toLowerCase()
              }} me-3"
              target="_blank"
              [href]="link.url"
            >
              <i class="{{ link.icon }}"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent implements OnInit {
  loadingBarState: any;
  constructor(private loadingBar: LoadingBarService) {}
  ngOnInit(): void {
    this.loadingBarState = this.loadingBar.useRef();

    this.loadingBarState.start();
    InitAnimateOnScroll();
    InitSmoothScroll();
    initParallax();
    this.loadingBarState.complete();
  }

  socialLinks = [
    {
      platform: 'Instagram',
      icon: 'ai-instagram',
      url: 'https://instagram.com/jsm33t',
    },
    {
      platform: 'Facebook',
      icon: 'ai-facebook',
      url: 'https://facebook.com/iamjsm33t',
    },
    {
      platform: 'YouTube',
      icon: 'ai-github',
      url: 'https://github.com/jsm33t',
    },
  ];
}
