import { Component, OnInit } from '@angular/core';
import Initswiper from '../../library/invokers/swiper';
import { LoadingBarService } from '@ngx-loading-bar/core';
import initParallax from '../../library/invokers/parallax';

@Component({
    selector: 'app-home',
    template: `
        <!-- hero -->
        <section class="bg-faded-primary d-flex min-vh-100 overflow-hidden py-2 bt-rad-1">
            <div class="container d-flex justify-content-center pb-sm-3 py-md-4 py-xl-5">
                <div class="row align-items-center pt-4 mt-4 mt-xxl-0">
                    <div class="col-lg-6 mb-4 mb-lg-0 mb-sm-2 pb-3 pb-lg-0">
                        <app-component-logo></app-component-logo>
                    </div>
                    <div class="col-lg-6 pb-5 mb-5 text-center text-lg-start">
                        <h1 class="display-2" data-aos="flip-up" data-aos-duration="200">
                            <span class="fw-normal">
                                Almond
                                <code>COVE</code>
                            </span>
                        </h1>
                        <div class="col-12 pb-3">
                            <p class="mb-3 mx-3" data-aos="fade" data-aos-duration="500" data-aos-offset="10">I don't feel particularly proud of myself. But when I walk alone in the woods or lie in the meadows, all is well.</p>
                        </div>
                        <div class="d-sm-flex justify-content-center justify-content-lg-start mt-lg-2">
                            <a class="btn btn-lg btn-primary w-100 w-sm-auto mb-2 mb-sm-0 me-sm-1" routerLink="/about">About</a>
                            <a class="btn btn-lg btn-link disabled" target="_blank" href="https://almondcove.in">
                                Coming soon...
                                <i class="ai-arrow-right ms-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      
        <!-- Services -->
        <section class="bg-secondary py-5">
            <div class="container py-3 py-sm-4 py-lg-5 my-md-2 my-lg-3 my-xl-4 my-xxl-5">
                <div class="fs-sm text-uppercase mb-3 mt-xl-2 mt-xxl-3">Work with us</div>
                <h2 class="h1 pb-3 mb-lg-4">Our services</h2>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 pb-xl-2 pb-xxl-3">
                    <!-- Item -->
                    <div class="col">
                        <div class="card h-100 border-0 rounded-5">
                            <div class="card-body pb-3">
                                <svg class="d-block mt-1 mt-sm-0 mb-4" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g class="text-info">
                                        <path
                                            d="M26.307 23.1116C26.307 28.3136 22.09 32.5307 16.888 32.5307C11.6859 32.5307 7.46891 28.3136 7.46891 23.1116C7.46891 17.9096 11.6859 13.6925 16.888 13.6925C17.1467 13.6925 17.4028 13.7038 17.6562 13.7243V6.24121C17.4016 6.22973 17.1455 6.22363 16.888 6.22363C7.56102 6.22363 0 13.7846 0 23.1116C0 32.4386 7.56102 39.9996 16.888 39.9996C26.2149 39.9996 33.7759 32.4386 33.7759 23.1116C33.7759 22.8541 33.7698 22.598 33.7584 22.3433H26.2753C26.2958 22.5968 26.307 22.8529 26.307 23.1116Z"
                                            fill="currentColor"
                                        ></path>
                                    </g>
                                    <g class="text-primary">
                                        <path d="M40 20C40 8.9543 31.0457 0 20 0V20H40Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <h3 class="h4">Market shares analysis</h3>
                                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget molestie massa. Donec egestas ex et velit egestas dignissim. Sed fringilla velit turpis.</p>
                            </div>
                            <div class="card-footer border-0 pt-3 mb-3">
                                <a class="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href="#" aria-label="Learn more">
                                    <i class="ai-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="col">
                        <div class="card h-100 border-0 rounded-5">
                            <div class="card-body pb-3">
                                <svg class="d-block mt-1 mt-sm-0 mb-4" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g class="text-info">
                                        <path d="M25,25h15v15H25V25z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-primary">
                                        <path d="M10,20c0-5.5,4.5-10,10-10s10,4.5,10,10h10C40,9,31,0,20,0S0,9,0,20s9,20,20,20V30C14.5,30,10,25.5,10,20z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <h3 class="h4">Marketing and branding</h3>
                                <p class="mb-0">Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue aliqua dolor do amet sint velit officia.</p>
                            </div>
                            <div class="card-footer border-0 pt-3 mb-3">
                                <a class="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href="#" aria-label="Learn more">
                                    <i class="ai-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="col">
                        <div class="card h-100 border-0 rounded-5">
                            <div class="card-body pb-3">
                                <svg class="d-block mt-1 mt-sm-0 mb-4" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g class="text-primary">
                                        <path d="M25.2791 12.7502C28.1954 9.83389 28.1954 5.10556 25.2791 2.18921C22.3627 -0.727136 17.6344 -0.727137 14.718 2.18921C11.8017 5.10556 11.8017 9.83389 14.718 12.7502C17.6344 15.6666 22.3627 15.6666 25.2791 12.7502Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-info">
                                        <path d="M14.6859 29.3056C15.6559 27.0123 16.9202 24.8838 18.4577 22.9467C13.8666 17.9802 7.29664 14.8701 0 14.8701V40.0004H12.5259C12.5259 36.2925 13.2527 32.6942 14.6859 29.3056Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-primary">
                                        <path d="M40.0014 40.0004V14.8701C26.1223 14.8701 14.8711 26.1214 14.8711 40.0004H40.0014Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <h3 class="h4">Strategy development</h3>
                                <p class="mb-0">More erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor non aute irure dolor in reprehenderit in.</p>
                            </div>
                            <div class="card-footer border-0 pt-3 mb-3">
                                <a class="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href="#" aria-label="Learn more">
                                    <i class="ai-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="col">
                        <div class="card h-100 border-0 rounded-5">
                            <div class="card-body pb-3">
                                <svg class="d-block mt-1 mt-sm-0 mb-4" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g class="text-info">
                                        <path d="M34.9811 16.2655C34.3635 26.3194 26.3194 34.3634 16.2656 34.981V40H40V16.2655H34.9811Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-info">
                                        <path d="M15.0195 30.0413C23.3152 30.0413 30.0403 23.3163 30.0403 15.0205H15.0195V30.0413Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-primary">
                                        <path d="M29.1953 10.0415C27.141 4.19328 21.571 0 15.0208 0C6.725 0 0 6.725 0 15.0208C0 21.571 4.19328 27.141 10.0415 29.1953V10.0415H29.1953Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <h3 class="h4">Email marketing</h3>
                                <p class="mb-0">Adipiscing posuere dui, amet, augue nisl dictum justo enier sed neque congue non quam ultrices interdum vitae vestibulumaute irure dolor in reprehenderit in.</p>
                            </div>
                            <div class="card-footer border-0 pt-3 mb-3">
                                <a class="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href="#" aria-label="Learn more">
                                    <i class="ai-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="col">
                        <div class="card h-100 border-0 rounded-5">
                            <div class="card-body pb-3">
                                <svg class="d-block mt-1 mt-sm-0 mb-4" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g class="text-primary">
                                        <path d="M19.9999 0C11.1313 0 3.61211 5.77313 0.992188 13.7659H39.0077C36.3877 5.77313 28.8686 0 19.9999 0Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-info">
                                        <path d="M7.29328 16.1094H0.379453C0.131328 17.368 0 18.6684 0 19.9998C0 26.9291 3.52437 33.0348 8.87797 36.6237L18.3427 27.1589L7.29328 16.1094Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-primary">
                                        <path d="M10.9688 37.848C13.6819 39.2238 16.7505 39.9998 20.0007 39.9998C31.0464 39.9998 40.0007 31.0455 40.0007 19.9998C40.0007 18.6684 39.8694 17.3679 39.6213 16.1094H32.7074L10.9688 37.848Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <h3 class="h4">Working on communication</h3>
                                <p class="mb-0">Ut eu amet ac blandit nisl malesuada lectus viverra arcu in rhoncus egestas lorem consequat sollicitudin risus, in pellentesque tellus tincidunt purus viverra dignissim.</p>
                            </div>
                            <div class="card-footer border-0 pt-3 mb-3">
                                <a class="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href="#" aria-label="Learn more">
                                    <i class="ai-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="col">
                        <div class="card h-100 border-0 rounded-5">
                            <div class="card-body pb-3">
                                <svg class="d-block mt-1 mt-sm-0 mb-4" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                    <g class="text-info">
                                        <path d="M20.0004 36.0226L10.982 21.3535C9.42594 23.3156 8.49609 25.7968 8.49609 28.4955C8.49609 34.8492 13.6467 39.9998 20.0004 39.9998C26.3541 39.9998 31.5047 34.8492 31.5047 28.4955C31.5047 25.7969 30.5749 23.3156 29.0188 21.3535L20.0004 36.0226Z" fill="currentColor"></path>
                                    </g>
                                    <g class="text-primary">
                                        <path d="M39.3962 0H0.605469L20.0009 31.5477L39.3962 0ZM25.7601 7.62359L20.0009 16.9914L14.2416 7.62359H25.7601Z" fill="currentColor"></path>
                                    </g>
                                </svg>
                                <h3 class="h4">Business copywriting</h3>
                                <p class="mb-0">Massa morbi duis et ornare urna dictum vestibulum pulvinar nunc facilisis ornare id at at ut arcu integer tristique placerat non turpis nibh turpis ullamcorper est porttitor.</p>
                            </div>
                            <div class="card-footer border-0 pt-3 mb-3">
                                <a class="btn btn-icon btn-lg btn-outline-primary rounded-circle stretched-link" href="#" aria-label="Learn more">
                                    <i class="ai-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- subscribe to mailing list CTA -->
        <section class="bg-primary py-5" data-bs-theme="dark">
            <div class="container pt-lg-2 pt-xl-4 pt-xxl-5 pb-1 pb-sm-3">
                <div class="row pt-sm-3 pt-md-4">
                    <div class="col-md-6 col-xl-5 offset-xl-1">
                        <h2 class="display-3">Ready to take your business to the next level?</h2>
                    </div>
                    <div class="col-md-6 col-lg-5 col-xl-4 offset-lg-1">
                        <p class="text-body fs-xl pb-4 mb-2 mb-lg-3">Massa velitienes semper faucibus tristique id nibh elementum, id eu aliquamd diam mi tempus at laciniarty scelerisques augue at morbi. Arcu sit orcirs, risus mattissit laoreet.</p>
                        <app-component-email></app-component-email>
                    </div>
                </div>
                <div class="d-none d-md-block text-center mt-n5">
                    <svg class="text-warning ms-lg-5" width="171" height="97" viewBox="0 0 171 97" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M169.319 54.333C162.404 55.9509 155.712 58.0764 149.09 60.6764L149.07 60.6761C148.967 60.7158 148.863 60.7554 148.76 60.7951C147.3 61.3811 148.325 63.4238 149.672 63.2067C154.548 62.4134 159.994 59.8725 164.87 59.0792C148.278 73.1339 129.684 89.2549 107.779 92.6402C85.6981 96.0539 65.5665 86.7839 56.8768 66.9865C70.9662 55.0671 79.2106 35.6614 79.0299 17.6457C78.9484 10.3157 76.1485 -3.36373 65.7068 1.21851C55.8557 5.53146 52.0466 22.5213 50.5736 31.7739C48.7364 43.2858 49.7593 55.5291 53.8643 66.2014C52.787 67.0812 51.6907 67.8989 50.5755 68.6546C40.6328 75.3851 27.1039 78.8929 16.4487 72.0362C2.91045 63.3259 1.93984 44.9485 1.56902 30.4091C1.54778 29.6265 0.359869 29.6092 0.360624 30.3915C0.322634 44.0809 0.835929 59.065 10.5664 69.6857C18.5722 78.4182 30.4315 79.7753 41.3346 75.9924C46.2437 74.2834 50.7739 71.7557 54.8581 68.6348C59.9738 80.2586 68.9965 89.6956 82.2735 93.7393C113.474 103.223 141.744 83.0494 164.903 63.697L161.901 71.0334C161.267 72.5887 163.76 73.2736 164.393 71.7389C165.986 67.8713 167.569 63.9933 169.152 60.1359C169.288 60.0247 169.695 58.6127 169.821 58.491C170.122 57.1161 169.152 60.1359 169.851 58.4169C170.189 57.6087 170.517 56.79 170.855 55.9818C171.248 54.9994 170.185 54.1192 169.319 54.333ZM54.3624 59.8578C51.4872 49.1623 51.6051 37.5841 54.2025 26.8039C55.5185 21.3369 57.4405 15.8066 60.1572 10.8541C61.2311 8.89354 62.5139 6.77134 64.2307 5.31421C69.4231 0.902277 74.3649 4.80357 75.8002 10.4446C80.5272 28.9489 70.1806 51.6898 55.8431 64.5114C55.2971 63.0109 54.793 61.4698 54.3624 59.8578Z"
                        ></path>
                    </svg>
                </div>
            </div>
        </section>
    `,
})
export class HomeComponent implements OnInit {
    loadingBarState: any;
    accordionItems = [
        {
            title: 'Accordion Item #1',
            content: "This is the first item's accordion body.",
        },
        {
            title: 'Accordion Item #2',
            content: "This is the second item's accordion body.",
        },
        {
            title: 'Accordion Item #3',
            content: "This is the third item's accordion body.",
        },
    ];

    constructor(private loadingBar: LoadingBarService) {}
    ngOnInit(): void {
        this.loadingBarState = this.loadingBar.useRef();
        this.loadingBarState.start();
        initParallax();
        Initswiper();
        this.loadingBarState.complete();
    }
}
