import { Component } from '@angular/core';

@Component({
    selector: 'app-bloghomesidepanel',
    template: `
        <!-- Sidebar (offcanvas on sreens < 992px) -->
      
            <div class="offcanvas-lg offcanvas-end" id="sidebarBlog">
                <div class="offcanvas-header">
                    <h4 class="offcanvas-title">Sidebar</h4>
                    <button class="btn-close ms-auto" type="button" data-bs-dismiss="offcanvas" data-bs-target="#sidebarBlog" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <!-- Search box -->
                    <div class="position-relative mb-4 mb-lg-5">
                        <i class="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                        <input class="form-control ps-5" type="search" placeholder="Enter keyword" />
                    </div>

                    <!-- Category links -->
                    <h4 class="pt-1 pt-lg-0 mt-lg-n2">Categories:</h4>
                    <ul class="nav flex-column mb-lg-5 mb-4">
                        <li class="mb-2">
                            <a class="nav-link d-flex p-0 active" href="#">
                                All categories
                                <span class="fs-sm text-body-secondary ms-2">(110)</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a class="nav-link d-flex p-0" href="#">
                                Inspiration
                                <span class="fs-sm text-body-secondary ms-2">(34)</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a class="nav-link d-flex p-0" href="#">
                                Brand strategy
                                <span class="fs-sm text-body-secondary ms-2">(8)</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a class="nav-link d-flex p-0" href="#">
                                Advertisement
                                <span class="fs-sm text-body-secondary ms-2">(45)</span>
                            </a>
                        </li>
                        <li class="mb-2">
                            <a class="nav-link d-flex p-0" href="#">
                                Ecommerce
                                <span class="fs-sm text-body-secondary ms-2">(17)</span>
                            </a>
                        </li>
                        <li>
                            <a class="nav-link d-flex p-0" href="#">
                                Travel &amp; Vacation
                                <span class="fs-sm text-body-secondary ms-2">(6)</span>
                            </a>
                        </li>
                    </ul>

                    <!-- Featured posts widget -->
                    <!-- <h4 class="pt-3 pt-lg-0 pb-1">Trending posts:</h4>
                    <div class="mb-lg-5 mb-4">
                        <article class="position-relative d-flex align-items-center mb-4">
                            <img class="rounded" src="assets/img/blog/sidebar/01.jpg" width="92" alt="Post image" />
                            <div class="ps-3">
                                <h4 class="h6 mb-2">
                                    <a class="stretched-link" href="blog-single-v1.html">Instagram trends that will definitely work</a>
                                </h4>
                                <span class="fs-sm text-body-secondary">13 hours ago</span>
                            </div>
                        </article>
                        <article class="position-relative d-flex align-items-center mb-4">
                            <img class="rounded" src="assets/img/blog/sidebar/02.jpg" width="92" alt="Post image" />
                            <div class="ps-3">
                                <h4 class="h6 mb-2">
                                    <a class="stretched-link" href="blog-single-v2.html">A session with a psychologist</a>
                                </h4>
                                <span class="fs-sm text-body-secondary">May 12, 2022</span>
                            </div>
                        </article>
                        <article class="position-relative d-flex align-items-center">
                            <img class="rounded" src="assets/img/blog/sidebar/03.jpg" width="92" alt="Post image" />
                            <div class="ps-3">
                                <h4 class="h6 mb-2">
                                    <a class="stretched-link" href="blog-single-v3.html">How to look for inspiration for new goals</a>
                                </h4>
                                <span class="fs-sm text-body-secondary">June 10, 2022</span>
                            </div>
                        </article>
                    </div> -->

                    <!-- Social buttons -->
                    <!-- <h4 class="pt-3 pt-lg-0 pb-1">Join us:</h4>
                    <div class="d-flex mt-n3 ms-n3 mb-lg-5 mb-4 pb-3 pb-lg-0">
                        <a class="btn btn-secondary btn-icon btn-sm btn-instagram rounded-circle mt-3 ms-3" href="#" aria-label="Instagram">
                            <i class="ai-instagram"></i>
                        </a>
                        <a class="btn btn-secondary btn-icon btn-sm btn-facebook rounded-circle mt-3 ms-3" href="#" aria-label="Facebook">
                            <i class="ai-facebook"></i>
                        </a>
                        <a class="btn btn-secondary btn-icon btn-sm btn-telegram rounded-circle mt-3 ms-3" href="#" aria-label="Telegram">
                            <i class="ai-telegram"></i>
                        </a>
                        <a class="btn btn-secondary btn-icon btn-sm btn-x rounded-circle mt-3 ms-3" href="#" aria-label="X">
                            <i class="ai-x"></i>
                        </a>
                    </div>

                    
                    <div class="position-relative mb-3">
                        <div class="position-absolute w-100 text-center top-0 start-50 translate-middle-x pt-4" style="max-width: 15rem;" data-bs-theme="light">
                            <h3 class="h2 pt-3 mb-0">Your banner here!</h3>
                        </div>
                        <img class="rounded-5" src="assets/img/blog/sidebar/banner.jpg" alt="Banner" />
                    </div> -->
                </div>
            </div>
     
    `,
})
export class BloghomesidepanelComponent {}
