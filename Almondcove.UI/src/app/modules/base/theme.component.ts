import { AfterViewInit, Component, OnInit } from '@angular/core';
import Initswiper from '../../library/invokers/swiper';

@Component({
    selector: 'app-theme',
    template: `
        <!-- Full height slider with scroll support -->
        <div class="vh-100 pt-5 pt-lg-4">
            <div
                class="swiper h-100"
                data-swiper-options='{
          "direction": "vertical",
          "mousewheel": {
            "thresholdDelta": 20
          }
        }'
            >
                <div class="swiper-wrapper">
                    <!-- Item -->
                    <div class="swiper-slide">
                        <div class="position-relative h-100">
                            <div class="bg-info position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block"></div>
                            <div class="d-flex flex-column flex-lg-row align-items-center h-100 position-relative z-2">
                                <div class="position-relative w-100 order-lg-2">
                                    <div class="bg-info position-absolute top-0 end-0 w-100 h-100 d-lg-none"></div>
                                    <a href="portfolio-single-v1.html">
                                        <img class="d-block position-relative z-2 mx-auto scale-up" src="https://around.createx.studio/assets/img/portfolio/slider/01.png" width="748" alt="Image" />
                                    </a>
                                </div>
                                <div class="w-100 order-lg-1 px-3 px-lg-4 py-4 pt-lg-0">
                                    <div class="text-center text-sm-start mx-auto" style="max-width: 450px;">
                                        <h2 class="h1 pb-2 pb-sm-0">An application for a national bank</h2>
                                        <p class="d-none d-sm-block pb-3 pb-lg-4 mb-1">Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis.</p>
                                        <a class="btn btn-sm btn-outline-dark fs-sm rounded-pill" href="portfolio-single-v1.html">Read the full story</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="swiper-slide">
                        <div class="position-relative h-100">
                            <div class="bg-danger position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block"></div>
                            <div class="d-flex flex-column flex-lg-row align-items-center h-100 position-relative z-2">
                                <div class="position-relative w-100 order-lg-2">
                                    <div class="bg-danger position-absolute top-0 end-0 w-100 h-100 d-lg-none"></div>
                                    <a href="portfolio-single-v1.html">
                                        <img class="d-block position-relative z-2 ms-auto from-end" src="https://around.createx.studio/assets/img/portfolio/slider/02.png" width="748" alt="Image" />
                                    </a>
                                </div>
                                <div class="w-100 order-lg-1 px-3 px-lg-4 py-4 pt-lg-0">
                                    <div class="text-center text-sm-start mx-auto" style="max-width: 450px;">
                                     
                                        <h2 class="h1 pb-2 pb-sm-1">Landing page for a marketing agency</h2>
                                        <ul class="list-unstyled d-none d-sm-block pb-1 pb-lg-2 mb-3">
                                            <li class="d-flex pb-1 mb-2">
                                                <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
                                                Faucibus sit est dui id gravida
                                            </li>
                                            <li class="d-flex pb-1 mb-2">
                                                <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
                                                Lectus in sem eu facilisis ornare
                                            </li>
                                            <li class="d-flex pb-1 mb-2">
                                                <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
                                                Massa maecenas cras vivamus
                                            </li>
                                        </ul>
                                        <a class="btn btn-sm btn-outline-dark fs-sm rounded-pill" href="portfolio-single-v1.html">Read the full story</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="swiper-slide">
                        <div class="position-relative h-100">
                            <div class="bg-primary position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block"></div>
                            <div class="d-flex flex-column flex-lg-row align-items-center h-100 position-relative z-2">
                                <div class="position-relative w-100 order-lg-2">
                                    <div class="bg-primary position-absolute top-0 end-0 w-100 h-100 d-lg-none"></div>
                                    <a href="portfolio-single-v1.html">
                                        <img class="d-block position-relative z-2 mx-auto scale-up" src="https://around.createx.studio/assets/img/portfolio/slider/03.png" width="748" alt="Image" />
                                    </a>
                                </div>
                                <div class="w-100 order-lg-1 px-3 px-lg-4 py-4 pt-lg-0">
                                    <div class="text-center text-sm-start mx-auto" style="max-width: 450px;">
                                        <h2 class="h1 pb-2 pb-sm-0">Design and dev of a dashboard</h2>
                                        <p class="d-none d-sm-block pb-3 pb-lg-4 mb-1">Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis.</p>
                                        <a class="btn btn-sm btn-outline-dark fs-sm rounded-pill" href="portfolio-single-v1.html">Read the full story</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Item -->
                    <div class="swiper-slide">
                        <div class="position-relative h-100">
                            <div class="position-absolute top-0 end-0 w-50 h-100 d-none d-lg-block" style="background-color: #d7e4f4;"></div>
                            <div class="d-flex flex-column flex-lg-row align-items-center h-100 position-relative z-2">
                                <div class="position-relative w-100 order-lg-2">
                                    <div class="position-absolute top-0 end-0 w-100 h-100 d-lg-none" style="background-color: #d7e4f4;"></div>
                                    <a href="portfolio-single-v1.html">
                                        <img class="d-block position-relative z-2 mx-auto scale-up" src="https://around.createx.studio/assets/img/portfolio/slider/04.png" width="748" alt="Image" />
                                    </a>
                                </div>
                                <div class="w-100 order-lg-1 px-3 px-lg-4 py-4 pt-lg-0">
                                    <div class="text-center text-sm-start mx-auto" style="max-width: 450px;">
                                        <h2 class="h1 pb-2 pb-sm-0">An application for a task tracker</h2>
                                        <p class="d-none d-sm-block pb-3 pb-lg-4 mb-1">Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis.</p>
                                        <div class="d-none d-lg-flex align-items-center pb-2 pb-lg-3 mb-3">
                                            <h6 class="text-body mb-0 me-3">Awards:</h6>
                                            <img class="d-block d-dark-mode-none me-4" src="https://around.createx.studio/assets/img/portfolio/brands/clutch-dark.svg" width="92" alt="Clutch" />
                                            <img class="d-none d-dark-mode-block me-4" src="https://around.createx.studio/assets/img/portfolio/brands/clutch-light.svg" width="92" alt="Clutch" />
                                            <img class="d-block d-dark-mode-none" src="https://around.createx.studio/assets/img/portfolio/brands/deloitte-dark.svg" width="95" alt="Deloitte" />
                                            <img class="d-none d-dark-mode-block" src="https://around.createx.studio/assets/img/portfolio/brands/deloitte-light.svg" width="95" alt="Deloitte" />
                                        </div>
                                        <a class="btn btn-sm btn-outline-dark fs-sm rounded-pill" href="portfolio-single-v1.html">Read the full story</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Scroll for more indicator -->
            <div class="position-fixed start-50 bottom-0 translate-middle-x rounded-4 rounded-bottom-0 bg-light shadow z-5 fs-sm fw-medium text-dark py-2 px-3">Scroll for more</div>
        </div>
    `,
})
export class ThemeComponent implements AfterViewInit {
    ngAfterViewInit(): void {
        Initswiper();
    }
}
