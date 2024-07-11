import { Component, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-about',
    template: `
        <section class=" position-relative pt-lg-3 pt-xl-4 pt-xxl-5">
            <div class="bg-primary bg-opacity-10 rounded-circle position-absolute start-50 d-none d-lg-block" style="bottom: 220px; width: 480px; height: 480px; margin-left: -240px;" data-aos="zoom-in" data-aos-duration="700" data-aos-delay="200" data-aos-offset="300"></div>
            <div class="container position-relative z-5 mt-2 pt-5 pb-2 pb-sm-2 pb-lg-2">
                <div class="display-3 text-center text-primary mx-auto pt-5 my-2 my-sm-4" style="max-width: 680px;">
                    <svg width="450" height="350" viewBox="220 400 900 600" xmlns="http://www.w3.org/2000/svg" data-aos="zoom-out" data-aos-duration="700" data-aos-delay="200" data-aos-offset="300">
                        <g transform="translate(0.000000,1341.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none" >
                            <path
                                d="M6599 9843 c-7 -16 -25 -46 -40 -68 -22 -34 -128 -208 -180 -294 -7 -14 -17 -30 -22 -35 -12 -18 -51 -79 -73 -116 -12 -19 -58 -95 -103 -167 -194 -316 -245 -400 -262 -431 -11 -18 -28 -45 -38 -60 -47 -70 -91 -143 -91 -151 0 -5 -3 -11 -8 -13 -4 -1 -27 -37 -52 -78 -25 -41 -48 -76 -52 -78 -5 -2 -8 -8 -8 -12 0 -9 -69 -122 -88 -145 -4 -5 -15 -25 -22 -42 -8 -18 -18 -33 -22 -33 -5 0 -8 -5 -8 -10 0 -9 -66 -116 -80 -130 -3 -3 -11 -15 -18 -27 -6 -13 -18 -33 -25 -45 -6 -13 -14 -25 -17 -28 -14 -14 -230 -371 -230 -380 0 -5 -3 -10 -8 -12 -4 -1 -27 -37 -52 -78 -24 -41 -54 -89 -67 -106 -13 -17 -23 -36 -23 -42 0 -7 -3 -12 -8 -12 -4 0 -18 -21 -32 -47 -13 -27 -27 -50 -30 -53 -3 -3 -11 -16 -19 -30 -8 -14 -31 -52 -51 -85 -20 -33 -50 -85 -67 -115 -16 -30 -43 -77 -60 -105 -16 -27 -36 -65 -44 -82 -7 -18 -17 -33 -21 -33 -5 0 -8 -9 -8 -20 0 -11 -4 -20 -10 -20 -5 0 -10 -9 -10 -20 0 -11 -4 -20 -8 -20 -10 0 -99 -185 -137 -285 -15 -38 -33 -83 -40 -100 -65 -154 -119 -369 -155 -625 -13 -90 -8 -507 7 -630 8 -65 8 -65 27 -30 10 19 41 67 67 107 27 40 49 75 49 78 0 3 5 11 10 18 15 18 54 78 86 133 16 27 36 58 46 68 10 11 18 23 18 27 0 4 29 50 65 102 36 52 65 100 65 106 0 6 4 11 9 11 5 0 14 14 21 30 7 17 16 30 21 30 5 0 9 5 9 10 0 6 23 44 50 85 28 41 50 79 50 85 0 5 5 10 10 10 6 0 10 5 10 10 0 9 127 205 157 245 5 6 28 44 53 85 25 41 48 80 53 85 4 6 28 44 54 85 25 41 70 112 99 157 30 46 54 87 54 93 0 5 4 10 9 10 5 0 13 9 16 20 3 11 12 26 18 33 13 14 12 13 88 137 29 47 63 99 76 116 12 17 23 36 23 42 0 7 5 12 10 12 6 0 10 4 10 9 0 12 63 115 73 119 4 2 7 8 7 13 0 10 29 56 135 219 34 52 81 127 105 165 24 39 66 106 93 150 28 44 73 116 100 160 28 44 65 104 84 132 18 29 33 57 33 62 0 5 4 11 8 13 4 2 29 37 55 78 25 41 50 80 54 86 4 5 14 21 22 35 8 13 36 58 61 99 26 41 62 100 81 130 62 101 75 110 105 75 30 -37 134 -192 134 -200 0 -3 5 -11 10 -18 15 -18 90 -137 90 -143 0 -3 18 -32 40 -64 22 -32 40 -63 40 -69 0 -5 3 -11 8 -13 4 -1 27 -37 52 -78 25 -41 48 -76 52 -78 5 -2 8 -8 8 -14 0 -6 20 -39 45 -74 25 -34 45 -65 45 -69 0 -3 18 -33 40 -65 22 -32 40 -61 40 -65 0 -3 24 -42 54 -88 29 -45 78 -122 109 -172 31 -49 60 -95 64 -101 8 -10 23 -36 47 -79 11 -19 18 -29 44 -59 6 -8 12 -17 12 -20 0 -9 65 -111 73 -114 4 -2 7 -8 7 -12 0 -8 67 -119 87 -145 5 -5 28 -44 53 -85 25 -41 48 -76 52 -78 5 -2 8 -8 8 -13 0 -11 112 -183 123 -187 4 -2 7 -8 7 -13 0 -8 89 -151 110 -176 5 -7 10 -14 10 -17 0 -3 18 -34 40 -68 22 -35 45 -70 50 -78 5 -8 40 -62 78 -120 38 -58 71 -110 73 -116 2 -6 38 -62 80 -125 60 -90 219 -334 279 -429 5 -8 28 -43 50 -78 22 -34 40 -64 40 -67 0 -2 24 -39 53 -82 29 -43 59 -90 67 -105 18 -38 18 -40 35 121 23 216 17 465 -15 636 -5 28 -14 79 -21 115 -15 88 -77 305 -105 370 -25 58 -31 73 -49 120 -37 101 -203 443 -217 448 -4 2 -8 7 -8 12 0 10 -144 261 -180 315 -15 22 -37 56 -48 76 -11 20 -26 47 -34 60 -7 13 -15 26 -18 29 -3 3 -11 16 -19 30 -8 14 -50 83 -93 154 -43 70 -78 130 -78 133 0 2 -5 9 -10 16 -11 13 -154 238 -174 272 -6 11 -13 22 -16 25 -5 5 -23 36 -44 75 -6 11 -32 53 -59 93 -26 40 -47 77 -47 82 0 6 -4 10 -8 10 -4 0 -14 16 -21 35 -7 19 -17 35 -22 35 -5 0 -9 4 -9 10 0 8 -65 116 -87 145 -26 33 -83 126 -83 135 0 5 -4 10 -10 10 -5 0 -10 4 -10 10 0 8 -61 110 -87 146 -5 5 -14 21 -21 33 -8 13 -22 38 -32 55 -42 73 -164 273 -184 301 -20 29 -68 106 -106 170 -10 17 -55 91 -100 165 -46 74 -88 145 -94 157 -6 13 -14 23 -18 23 -5 0 -8 5 -8 10 0 10 -34 65 -109 180 -20 30 -43 67 -50 83 -10 19 -22 27 -41 27 -19 0 -31 -8 -41 -27z"
                            />
                            <path
                                d="M6405 6685 c-151 -20 -318 -57 -339 -76 -6 -5 -20 -9 -32 -9 -13 0 -26 -4 -29 -10 -3 -5 -13 -10 -20 -10 -45 0 -311 -140 -367 -192 -7 -7 -31 -26 -53 -43 -79 -58 -235 -223 -273 -287 -9 -16 -20 -28 -24 -28 -4 0 -8 -5 -8 -10 0 -6 -29 -54 -63 -108 -35 -53 -88 -135 -118 -182 -29 -47 -56 -87 -60 -90 -3 -3 -12 -16 -19 -29 -7 -14 -17 -30 -22 -35 -5 -6 -35 -54 -68 -106 -33 -52 -65 -102 -70 -110 -29 -44 -70 -111 -70 -116 0 -3 -5 -10 -10 -17 -6 -7 -36 -52 -68 -102 -31 -49 -60 -94 -65 -100 -21 -28 -87 -137 -87 -145 0 -6 -4 -10 -9 -10 -5 0 -14 -13 -21 -30 -7 -16 -16 -30 -21 -30 -5 0 -9 -5 -9 -11 0 -6 -13 -29 -29 -52 -16 -23 -38 -58 -49 -78 -41 -73 -47 -83 -59 -97 -7 -7 -13 -17 -13 -22 0 -5 -6 -15 -13 -22 -7 -7 -32 -45 -56 -85 -23 -40 -49 -77 -57 -84 -8 -6 -14 -15 -14 -20 0 -5 -29 -53 -64 -107 -34 -53 -82 -128 -106 -167 -24 -38 -58 -94 -77 -123 -19 -30 -33 -55 -31 -55 27 -14 700 7 705 21 4 9 9 19 12 22 9 8 101 149 101 155 0 3 20 36 43 73 102 157 117 182 117 191 0 5 3 11 8 13 4 2 27 37 52 78 25 41 48 80 53 85 4 6 22 33 39 60 17 28 46 74 64 102 19 29 34 55 34 58 0 4 18 33 40 65 22 32 40 62 40 65 0 3 5 11 10 18 14 17 97 147 150 237 25 41 48 77 52 78 5 2 8 8 8 13 0 12 52 93 63 97 4 2 7 8 7 13 0 78 391 519 460 519 6 0 10 4 10 9 0 11 158 83 255 116 268 90 576 86 839 -11 39 -14 80 -29 91 -32 116 -33 355 -224 453 -362 26 -36 52 -71 59 -78 6 -6 15 -21 18 -32 3 -11 11 -20 16 -20 5 0 9 -4 9 -10 0 -8 68 -121 88 -145 4 -5 15 -25 22 -42 8 -18 18 -33 21 -33 4 0 12 -13 19 -30 7 -16 15 -30 19 -30 3 0 17 -23 30 -50 14 -28 29 -50 33 -50 4 0 8 -5 8 -11 0 -6 16 -33 35 -59 19 -26 35 -51 35 -54 0 -4 5 -12 10 -19 14 -16 110 -167 110 -172 0 -4 63 -108 70 -115 3 -3 11 -15 18 -27 6 -13 18 -33 25 -45 6 -13 14 -25 17 -28 3 -3 26 -39 50 -80 25 -41 49 -80 55 -87 5 -7 16 -19 23 -27 6 -8 12 -17 12 -20 0 -6 74 -125 88 -141 5 -6 11 -15 13 -21 8 -20 124 -210 135 -221 7 -7 14 -17 16 -22 2 -5 147 -11 350 -13 347 -3 347 -3 320 47 -15 28 -30 52 -34 53 -5 2 -8 8 -8 13 0 8 -38 71 -62 104 -19 25 -145 223 -157 248 -8 15 -18 27 -23 27 -4 0 -8 5 -8 11 0 5 -18 37 -40 69 -22 32 -40 63 -40 69 0 5 -3 11 -7 13 -5 2 -26 32 -47 68 -39 64 -149 236 -164 255 -4 6 -27 44 -52 85 -25 41 -48 80 -53 85 -4 6 -31 48 -61 95 -29 47 -75 120 -102 162 -27 43 -54 86 -59 95 -6 10 -34 53 -63 95 -28 42 -52 82 -52 88 0 5 -4 10 -8 10 -5 0 -14 11 -20 25 -7 14 -17 31 -22 38 -15 17 -90 137 -90 143 0 3 -4 10 -10 17 -5 7 -51 76 -103 153 -98 147 -129 186 -237 294 -96 96 -175 159 -265 211 -56 32 -83 46 -197 98 -249 114 -640 166 -953 126z"
                            />
                            <path
                                d="M5241 4453 c-209 -314 -208 -297 -41 -422 19 -14 37 -28 40 -31 3 -4 41 -29 85 -58 44 -29 85 -56 92 -62 6 -5 33 -19 60 -31 26 -13 50 -25 53 -29 9 -10 225 -110 237 -110 5 0 28 -9 51 -20 22 -11 46 -20 52 -20 6 0 46 -12 88 -26 88 -30 122 -39 297 -74 167 -33 535 -46 650 -23 33 7 101 20 150 28 122 21 333 81 418 119 17 7 59 24 92 37 100 38 393 199 415 228 3 3 17 13 31 21 44 25 90 62 157 126 64 62 64 62 -73 265 -76 112 -163 242 -194 288 -55 83 -55 83 -86 45 -60 -76 -156 -165 -233 -217 -26 -17 -49 -33 -52 -37 -3 -3 -27 -19 -55 -35 -120 -72 -270 -131 -415 -164 -30 -7 -71 -17 -90 -21 -136 -32 -403 -39 -560 -15 -231 36 -318 62 -518 153 -41 19 -134 73 -142 82 -3 3 -21 17 -40 30 -55 39 -169 136 -182 155 -81 124 -82 123 -287 -182z"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </section>

        <section class="container pt-2 pb-5 mb-5 mt-lg-3 mt-xl-2 mt-xxl-2">
            <div class="pt-4 pt-sm-3 mt-md-3">
                <h1 class="pb-3 mb-2 mb-sm-3 mb-lg-4" data-aos="flip-up" data-aos-duration="300">
                    welcome to
                    <span class="text-primary">Almondcove</span>
                </h1>
                <p class="fs-lg" data-aos="fade-in" data-aos-duration="500">
                    &nbsp;&nbsp;&nbsp;&nbsp;I am a full-stack web developer with a strong focus on writing efficient business logic, specializing in
                    <span _ngcontent-ng-cli-universal-c5="" class="text-primary">.NET, C#</span>
                    (MVC,Web Api's,Razor Pages). I have successfully crafted and implemented intricate web applications that drive efficiency and results for businesses. Proficient in UI design using Bootstrap and have a command over
                    <span _ngcontent-ng-cli-universal-c5="" class="text-primary">Vue Js</span>
                    , allowing me to create visually appealing and highly responsive user interfaces. I'm also in the early stages of my journey with
                    <span _ngcontent-ng-cli-universal-c5="" class="text-primary">Angular</span>
                    , eagerly learning and expanding my skill set to become well-versed in this popular front-end framework.
                </p>
                <div class="d-flex">
                    <div class="d-flex">
                        <a *ngFor="let link of socialLinks" class="btn btn-outline-secondary btn-icon btn-sm {{ 'btn-' + link.platform.toLowerCase() }} me-3" target="_blank" [href]="link.url">
                            <i class="{{ link.icon }}"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Breadcrumb + Services grid -->
        <section class="container py-5 mt-5 mb-md-3 mb-lg-4 mb-xxl-5">
            <!-- Services grid -->
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 pb-sm-3 pb-md-4 pb-xl-5">
                <!-- Item -->
                <div class="col">
                    <a class="card card-hover-primary bg-secondary border-0 h-100 text-decoration-none" routerLink="/contact">
                        <div class="card-body pb-0">
                            <svg class="d-block text-warning mb-4" width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.7276 27.5001C1.21683 28.3857 0.916576 29.3769 0.850062 30.3971C0.783549 31.4173 0.952558 32.4391 1.34402 33.3835C1.73548 34.328 2.33891 35.1697 3.10764 35.8437C3.87638 36.5177 4.78982 37.0058 5.77734 37.2704C6.76486 37.5349 7.8 37.5689 8.80272 37.3695C9.80544 37.1701 10.7489 36.7428 11.5601 36.1206C12.3713 35.4983 13.0285 34.6979 13.4809 33.7811C13.9334 32.8643 14.1689 31.8558 14.1693 30.8334C14.1698 29.3654 13.6858 27.9382 12.7924 26.7734C11.8989 25.6085 10.6459 24.7712 9.22787 24.3913C7.80984 24.0114 6.30606 24.1101 4.94991 24.6722C3.59375 25.2344 2.46105 26.2284 1.7276 27.5001Z"
                                ></path>
                                <path d="M11.7344 10.1667L4.23438 23.1667C5.42383 22.6595 6.71498 22.4361 8.00568 22.5142C9.29638 22.5922 10.5512 22.9695 11.6709 23.6163C12.7906 24.263 13.7444 25.1615 14.4569 26.2405C15.1694 27.3196 15.621 28.5496 15.776 29.8333L19.0427 24.1667C12.8427 13.45 11.9427 12.425 11.7344 10.1667Z"></path>
                                <path
                                    d="M38.2784 27.5C37.8534 26.7833 25.6701 5.6083 25.4284 5.29996C24.4255 3.9011 22.9204 2.94436 21.2281 2.62997C19.5358 2.31559 17.7875 2.66792 16.3491 3.61323C14.9107 4.55855 13.8936 6.02357 13.5108 7.70171C13.1279 9.37984 13.409 11.141 14.2951 12.6166C14.2118 12.6166 13.8784 11.9 26.7284 34.1666C27.1662 34.925 27.749 35.5898 28.4437 36.1229C29.1383 36.656 29.9311 37.0471 30.7769 37.2739C31.6227 37.5006 32.5049 37.5585 33.373 37.4443C34.2412 37.3301 35.0784 37.046 35.8368 36.6083C36.5952 36.1706 37.2599 35.5877 37.793 34.8931C38.3262 34.1984 38.7173 33.4056 38.944 32.5598C39.1707 31.714 39.2287 30.8319 39.1145 29.9637C39.0003 29.0955 38.7162 28.2583 38.2784 27.5Z"
                                ></path>
                            </svg>
                            <h3 class="h4 card-title mt-0">Contact</h3>
                            <p class="card-text">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit.</p>
                        </div>
                        <div class="card-footer border-0 py-3 my-3 mb-sm-4">
                            <div class="btn btn-lg btn-icon btn-outline-primary rounded-circle pe-none">
                                <i class="ai-arrow-right"></i>
                            </div>
                        </div>
                    </a>
                </div>

                <!-- Item -->
                <div class="col">
                    <a class="card card-hover-primary bg-secondary border-0 h-100 text-decoration-none" routerLink="/faq">
                        <div class="card-body pb-0">
                            <svg class="d-block text-warning mb-4" width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M32.6213 22.7824C26.4943 23.0213 20.6934 24.6146 15.525 27.255L8.87893 31.0927C7.12129 32.1061 4.87665 31.4978 3.86795 29.7493L0.49035 23.9008C-0.520513 22.1491 0.0820047 19.9007 1.83372 18.8898L7.33997 15.7103C7.65881 15.5262 8.06657 15.6354 8.25074 15.9543L12.5774 23.4483C12.7647 23.7727 13.1836 23.8804 13.5051 23.6822C13.816 23.4905 13.9009 23.074 13.7182 22.7577L9.36036 15.2095C9.18727 14.9097 9.27227 14.5269 9.55686 14.3297C14.1026 11.1781 17.9484 7.16404 20.9018 2.48266C22.0206 0.707687 24.6278 0.755188 25.6794 2.57599L34.9289 18.5981C35.9801 20.415 34.7215 22.7007 32.6213 22.7824ZM33.8082 11.6236C34.1506 9.6637 33.0019 7.69797 31.1452 7.02512C30.5616 6.81361 30.0322 7.44872 30.3425 7.98632C31.0812 9.2661 31.8225 10.5503 32.5721 11.8482C32.8853 12.3903 33.7004 12.2404 33.8082 11.6236ZM18.4184 35.2136L15.2546 29.7215C15.0708 29.4024 14.6625 29.2929 14.3434 29.477C12.6288 30.4663 12.564 30.5047 10.2768 31.8249C9.95788 32.009 9.84821 32.417 10.0324 32.736L13.2016 38.2245C13.6078 38.9274 14.3384 39.3096 15.0824 39.3096C15.8041 39.3096 16.0801 39.0654 17.625 38.1737C18.66 37.5762 19.0159 36.2478 18.4184 35.2136ZM38.676 6.55444C38.9948 6.37035 39.1041 5.96259 38.92 5.64375C38.736 5.32499 38.3284 5.21557 38.0093 5.39974L36.2843 6.39569C35.694 6.73653 35.9409 7.63989 36.6183 7.63989C36.8554 7.63981 36.8079 7.63297 38.676 6.55444ZM32.5456 3.09976L32.9663 1.53004C33.0616 1.17437 32.8505 0.808857 32.495 0.713521C32.139 0.618351 31.7737 0.829274 31.6783 1.18495L31.2577 2.75466C31.1444 3.17734 31.4629 3.5941 31.902 3.5941C32.1964 3.59402 32.4658 3.3976 32.5456 3.09976ZM39.9772 13.6731C40.0725 13.3175 39.8613 12.9519 39.5057 12.8566L37.9359 12.436C37.5803 12.3409 37.2148 12.5519 37.1194 12.9075C37.0241 13.2631 37.2353 13.6286 37.5909 13.724C39.3076 14.184 39.2134 14.1675 39.3336 14.1675C39.6279 14.1675 39.8973 13.971 39.9772 13.6731Z"
                                ></path>
                            </svg>
                            <h3 class="h4 card-title mt-0">FAQ</h3>
                            <p class="card-text">Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue.</p>
                        </div>
                        <div class="card-footer border-0 py-3 my-3 mb-sm-4">
                            <div class="btn btn-lg btn-icon btn-outline-primary rounded-circle pe-none">
                                <i class="ai-arrow-right"></i>
                            </div>
                        </div>
                    </a>
                </div>

                <!-- Item -->
                <div class="col">
                    <a class="card card-hover-primary bg-secondary border-0 h-100 text-decoration-none" href="#">
                        <div class="card-body pb-0">
                            <svg class="d-block text-warning mb-4" width="40" height="40" viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.7306 12.5C25.4119 6.375 22.5994 2.5 19.9981 2.5C17.3969 2.5 14.5844 6.375 13.2656 12.5H26.7306Z"></path>
                                <path d="M12.5 20C12.4997 21.6722 12.6112 23.3426 12.8338 25H27.1663C27.3888 23.3426 27.5003 21.6722 27.5 20C27.5003 18.3278 27.3888 16.6574 27.1663 15H12.8338C12.6112 16.6574 12.4997 18.3278 12.5 20Z"></path>
                                <path d="M13.2656 27.5C14.5844 33.625 17.3969 37.5 19.9981 37.5C22.5994 37.5 25.4119 33.625 26.7306 27.5H13.2656Z"></path>
                                <path d="M29.2956 12.5H37.1706C35.9874 9.80721 34.1895 7.42918 31.9213 5.55667C29.6531 3.68416 26.9775 2.36928 24.1094 1.7175C26.4806 3.80375 28.3406 7.66125 29.2956 12.5Z"></path>
                                <path d="M38.0638 15H29.6887C29.895 16.6587 29.9981 18.3286 29.9975 20C29.9977 21.6715 29.8941 23.3413 29.6875 25H38.0625C38.9741 21.729 38.9741 18.271 38.0625 15H38.0638Z"></path>
                                <path d="M24.1094 38.2825C26.978 37.6311 29.654 36.3164 31.9227 34.4438C34.1914 32.5713 35.9896 30.1931 37.1731 27.5H29.2981C28.3406 32.3388 26.4806 36.1963 24.1094 38.2825Z"></path>
                                <path d="M10.7109 27.5H2.83594C4.01943 30.1931 5.81766 32.5713 8.08636 34.4438C10.3551 36.3164 13.0311 37.6311 15.8997 38.2825C13.5259 36.1963 11.6659 32.3388 10.7109 27.5Z"></path>
                                <path d="M15.8919 1.7175C13.0233 2.36893 10.3472 3.68365 8.07854 5.55618C5.80984 7.42871 4.01161 9.80692 2.82812 12.5H10.7031C11.6606 7.66125 13.5206 3.80375 15.8919 1.7175Z"></path>
                                <path d="M9.99868 20C9.99852 18.3285 10.102 16.6587 10.3087 15H1.93369C1.0221 18.271 1.0221 21.729 1.93369 25H10.3087C10.102 23.3413 9.99852 21.6715 9.99868 20Z"></path>
                            </svg>
                            <h3 class="h4 card-title mt-0">Attributions</h3>
                            <p class="card-text">Hac erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor non.</p>
                        </div>
                        <div class="card-footer border-0 py-3 my-3 mb-sm-4">
                            <div class="btn btn-lg btn-icon btn-outline-primary rounded-circle pe-none">
                                <i class="ai-arrow-right"></i>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    `,
})
export class AboutComponent implements OnInit {
    loadingBarState: any;
    constructor(private loadingBar: LoadingBarService,private titleService: Title, private metaService: Meta) {}
    ngOnInit(): void {
        
        this.titleService.setTitle('About');
        this.metaService.updateTag({ name: 'description', content: 'About almondcove' });
        this.metaService.updateTag({ name: 'keywords', content: 'my space, blogs, archives, jsm33t, almondcove' });

        this.loadingBarState = this.loadingBar.useRef();

        this.loadingBarState.start();
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
