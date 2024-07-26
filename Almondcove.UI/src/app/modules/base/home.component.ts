import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LoadingBarService } from '@ngx-loading-bar/core';
// import {initParallax, destroyParallax } from '../../library/invokers/parallax';

@Component({
    selector: 'app-home',
    template: `
        <!-- hero -->
        <section class="bg-faded-primary d-flex min-vh-100 overflow-hidden py-2 bt-rad-1">
            <div class="container d-flex justify-content-center pb-sm-3 py-md-4 py-xl-5">
                <div class="row align-items-center pt-4 mt-4 mt-xxl-0">
                    <div class="col-lg-6 mb-4 mb-lg-0 mb-sm-2 pb-3 pb-lg-0">
                        <app-logo></app-logo>
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
        <!-- subscribe to mailing list CTA -->
        <section class="bg-primary py-5" data-bs-theme="dark">
            <div class="container pt-lg-2 pt-xl-4 pt-xxl-5 pb-1 pb-sm-3">
                <div class="row pt-sm-3 pt-md-4">
                    <div class="col-md-6 col-xl-5 offset-xl-1">
                        <h2 class="display-3">Ready to take your business to the next level?</h2>
                    </div>
                    <div class="col-md-6 col-lg-5 col-xl-4 offset-lg-1">
                        <p class="text-body fs-xl pb-4 mb-2 mb-lg-3">Massa velitienes semper faucibus tristique id nibh elementum, id eu aliquamd diam mi tempus at laciniarty scelerisques augue at morbi. Arcu sit orcirs, risus mattissit laoreet.</p>
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
export class HomeComponent implements OnInit ,OnDestroy{
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

    constructor(private loadingBar: LoadingBarService,private titleService: Title,private metaService: Meta) {}
    ngOnDestroy(): void {
        //destroyParallax()
    }
    ngOnInit(): void {
        this.titleService.setTitle('Almondcove');
        this.metaService.updateTag({ name: 'description', content: 'A digital web space with blogs , gallery , apps and much more' });
        this.metaService.updateTag({ name: 'keywords', content: 'my space, blogs, archives, jsm33t, almondcove' });
        this.loadingBarState = this.loadingBar.useRef();
        this.loadingBarState.start();
       // initParallax();
        this.loadingBarState.complete();
    }
    
}
