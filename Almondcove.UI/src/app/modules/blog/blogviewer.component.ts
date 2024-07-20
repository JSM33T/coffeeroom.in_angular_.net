import { Component, OnInit } from '@angular/core';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../library/invokers/smooth-scroll';

@Component({
    selector: 'app-blogviewer',
    template: `
        <!-- Page container-->
        <section class="container pt-5 mt-5">
            <!-- Breadcrumb-->
            <nav aria-label="breadcrumb">
                <ol class="pt-lg-3 pb-lg-4 pb-2 breadcrumb">
                    <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
                    <li class="breadcrumb-item"><a routerLink="/blog">Blog</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Single post v.3</li>
                </ol>
            </nav>

            <div class="row">
                <div class="col-lg-9 col-xl-8 pe-lg-4 pe-xl-0">
                    <!-- Post title + post meta -->
                    <h1 class="pb-2 pb-lg-3">How to look for inspiration for new goals in life and remember to give yourself a break?</h1>
                    <div class="d-flex flex-wrap align-items-center justify-content-between border-bottom mb-4">
                        <div class="d-flex align-items-center mb-4 me-4">
                            <span class="fs-sm me-2">By:</span>
                            <a class="nav-link position-relative fw-semibold p-0" href="#author" data-scroll data-scroll-offset="80">
                                Darlene Robertson
                                <span class="d-block position-absolute start-0 bottom-0 w-100" style="background-color: currentColor; height: 1px"></span>
                            </a>
                        </div>
                        <div class="d-flex align-items-center mb-4">
                            <span class="fs-sm me-2">Share post:</span>
                            <div class="d-flex">
                                <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Instagram" aria-label="Instagram">
                                    <i class="ai-instagram"></i>
                                </a>
                                <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Facebook" aria-label="Facebook">
                                    <i class="ai-facebook"></i>
                                </a>
                                <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Telegram" aria-label="Telegram">
                                    <i class="ai-telegram fs-sm"></i>
                                </a>
                                <a class="nav-link p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="X" aria-label="X">
                                    <i class="ai-x"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Post content -->
                    <p class="fs-lg pt-2 pt-sm-3">
                        Dolor laoreet fermentum lectus praesent aenean molestie mollis integer. Sem ullamcorper montes, lorem ullamcorper orci, pellentesque ipsum malesuada gravida. Donec imperdiet nulla suscipit in. Dignissim ornare ac lorem consectetur massa a. Pellentesque urna pharetra, quis maecenas. Sit dolor amet nulla aenean eu, ac. Nisl mi tempus, iaculis viverra vestibulum scelerisque imperdiet montes. Mauris massa elit pretium elementum eget tortor quis. Semper interdum lectus odio diam.
                    </p>
                    <p class="fs-lg mb-3">
                        Ut pellentesque bibendum dignissim a molestie. Ultrices diam ut vel neque tincidunt eget. Sed ut quis sit semper nunc at etiam lacinia. Quam laoreet eget id sapien a pharetra, ornare diam dignissim. Lorem amet nisl, enim mi aenean mauris. Porta nisl a ultrices ut libero id. Gravida a mi neque, tristique justo, et pharetra. Laoreet nulla est nulla cras ac arcu sed mattis tristique. Morbi convallis suspendisse enim blandit massa. Cursus augue dui mattis morbi velit.
                    </p>
                    <h2 class="h4 mb-lg-4 pt-3 pt-md-4 pt-xl-5">Dolor laoreet fermentum lectus praesent aenean</h2>
                    <p class="fs-lg pb-4 pb-xl-5">
                        Ut pellentesque bibendum dignissim a molestie. Ultrices diam ut vel neque tincidunt eget. Sed ut quis sit semper nunc at etiam lacinia. Quam laoreet eget id sapien a pharetra, ornare diam dignissim. Lorem amet nisl, enim mi aenean mauris. Porta nisl a ultrices ut libero id. Gravida a mi neque, tristique justo, et pharetra. Laoreet nulla est nulla cras ac arcu sed mattis tristique. Morbi convallis suspendisse enim blandit massa. Cursus augue dui mattis morbi velit.
                    </p>
                    <figure class="figure">
                        <img class="figure-img rounded-5 mb-3" src="https://around.createx.studio/assets/img/blog/single/image.jpg" alt="Image" />
                        <figcaption class="figure-caption">Image source tristique justo et pharetra</figcaption>
                    </figure>
                    <h2 class="h4 mb-lg-4 pt-3 pt-md-4 pt-xl-5">Cursus augue dui mattis morbi velit</h2>
                    <p class="fs-lg pb-2 pb-lg-0 mb-4 mb-lg-5">
                        Proin non congue sem, sed tristique ante. Donec et sollicitudin tellus. Duis maximus, dui eget egestas mattis, purus ex tempor nulla, quis tempor sapien neque at nisl. Aliquam eu nisi ut nisl ultrices posuere. Praesent dignissim efficitur nisi, a hendrerit ipsum elementum sit amet. Vivamus non ante nisl. Nunc faucibus velit at eros mollis semper. Curabitur aliquam eros tellus, nec facilisis nisl finibus sit amet. Ut et dolor nec lorem gravida elementum.
                    </p>
                    <div class="card border-0 bg-secondary mb-3">
                        <div class="card-body">
                            <figure>
                                <blockquote class="blockquote">
                                    <p>Ut pellentesque bibendum dignissim a molestie ultrices diam ut vel neque tincidunt eget sed ut quis sit semper nunc at etiam lacinia quam laoreet eget id sapien a pharetra, ornare diam dignissim neque tincidunt.</p>
                                </blockquote>
                                <figcaption class="blockquote-footer">Darlene Robertson</figcaption>
                            </figure>
                        </div>
                    </div>
                    <h2 class="h4 mb-lg-4 pt-3 pt-md-4 pt-xl-5">Lorem ipsum dolor sit amet consectetur</h2>
                    <p class="fs-lg">Ut pellentesque bibendum dignissim a molestie. Ultrices diam ut vel neque tincidunt eget. Sed ut quis sit semper nunc at etiam lacinia. Quam laoreet eget id sapien a pharetra, ornare diam dignissim.</p>
                    <ul>
                        <li class="mb-1">Quam laoreet eget id sapien</li>
                        <li class="mb-1">Morbi convallis suspendisse</li>
                        <li class="mb-1">Vivamus non ante</li>
                        <li class="mb-1">Praesent dignissim efficitur</li>
                        <li class="mb-1">Gravida a mi neque</li>
                    </ul>
                    <p class="fs-lg">Donec diam neque, efficitur vitae ante a, eleifend placerat est. Phasellus dapibus scelerisque diam, eu rhoncus lorem vulputate lobortis. Praesent pulvinar venenatis mauris, eget fringilla sem.</p>

                    <!-- Tags -->
                    <div class="d-flex flex-wrap pb-5 pt-3 pt-md-4 pt-xl-5 mt-xl-n2">
                        <h3 class="h6 py-1 mb-0 me-4">Relevant tags:</h3>
                        <a class="nav-link fs-sm py-1 px-0 me-3" href="#">
                            <span class="text-primary">#</span>
                            Inspiration
                        </a>
                        <a class="nav-link fs-sm py-1 px-0 me-3" href="#">
                            <span class="text-primary">#</span>
                            Travel
                        </a>
                        <a class="nav-link fs-sm py-1 px-0 me-3" href="#">
                            <span class="text-primary">#</span>
                            Books
                        </a>
                    </div>

                    <!-- Author widget -->
                    <div class="border-top border-bottom py-4" id="author">
                        <div class="d-flex align-items-start py-2">
                            <img class="d-block rounded-circle mb-3" src="assets/img/avatar/04.jpg" width="56" alt="Author image" />
                            <div class="d-md-flex w-100 ps-4">
                                <div style="max-width: 26rem">
                                    <h3 class="h5 mb-2">Darlene Robertson</h3>
                                    <p class="fs-sm mb-0">Porta nisl a ultrices ut libero id. Gravida mi neque, tristique justo, et pharetra laoreet nulla est nulla cras ac arcu sed mattis tristique convallis suspen enim blandit massa cursus augue dui mattis morbi velit semper nunc at etiam lacinia.</p>
                                </div>
                                <div class="pt-4 pt-md-0 ps-md-4 ms-md-auto">
                                    <h3 class="h5">Share post:</h3>
                                    <div class="d-flex">
                                        <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Instagram" aria-label="Instagram">
                                            <i class="ai-instagram"></i>
                                        </a>
                                        <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Facebook" aria-label="Facebook">
                                            <i class="ai-facebook"></i>
                                        </a>
                                        <a class="nav-link p-2 me-2" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Telegram" aria-label="Telegram">
                                            <i class="ai-telegram fs-sm"></i>
                                        </a>
                                        <a class="nav-link p-2" href="#" data-bs-toggle="tooltip" data-bs-placement="bottom" title="X" aria-label="X">
                                            <i class="ai-x"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Comments -->
                    <div class="pt-4 pt-xl-5 mt-4" id="comments">
                        <h2 class="h1 py-lg-1 py-xl-3">14 comments</h2>

                        <!-- Comment -->
                        <div class="border-bottom py-4 mt-2 mb-4">
                            <div class="d-flex align-items-center pb-1 mb-3">
                                <img class="rounded-circle" src="assets/img/avatar/08.jpg" width="48" alt="Comment author" />
                                <div class="ps-3">
                                    <h6 class="mb-0">Albert Flores</h6>
                                    <span class="fs-sm text-body-secondary">5 hours ago</span>
                                </div>
                            </div>
                            <p class="pb-2 mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tellus lectus, tempus eu urna eu, imperdiet dignissim augue. Aliquam fermentum est a ligula bibendum, ac gravida ipsum dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur suscipit quam ut velit condimentum, nec mollis risus semper. Curabitur quis mauris eget ligula tincidunt venenatis. Sed congue pulvinar hendrerit.</p>
                            <button class="nav-link fs-sm fw-semibold px-0 py-2" type="button">
                                Reply
                                <i class="ai-redo fs-xl ms-2"></i>
                            </button>
                        </div>

                        <!-- Comment -->
                        <div class="border-bottom pt-2 pb-4">
                            <div class="d-flex align-items-center pb-1 mb-3">
                                <img class="rounded-circle" src="assets/img/avatar/11.jpg" width="48" alt="Comment author" />
                                <div class="ps-3">
                                    <h6 class="mb-0">Jenny Wilson</h6>
                                    <span class="fs-sm text-body-secondary">2 days ago at 9:20</span>
                                </div>
                            </div>
                            <p class="pb-2 mb-0">Pellentesque urna pharetra, quis maecenas. Sit dolor amet nulla aenean eu, ac. Nisl mi tempus, iaculis viverra vestibulum scelerisque imperdiet montes mauris massa elit pretium elementum eget tortor quis</p>
                            <button class="nav-link fs-sm fw-semibold px-0 py-2" type="button">
                                Reply
                                <i class="ai-redo fs-xl ms-2"></i>
                            </button>

                            <!-- Comment reply -->
                            <div class="card card-body border-0 bg-secondary mt-4">
                                <div class="d-flex align-items-center pb-1 mb-3">
                                    <img class="rounded-circle" src="assets/img/avatar/10.jpg" width="48" alt="Comment author" />
                                    <div class="ps-3">
                                        <h6 class="mb-0">Ralph Edwards</h6>
                                        <span class="fs-sm text-body-secondary">2 days ago at 11:45</span>
                                    </div>
                                </div>
                                <p class="mb-0">
                                    <a class="fw-bold text-decoration-none" href="#">Jenny Wilson</a>
                                    Massa morbi duis et ornare urna dictum vestibulum pulvinar nunc facilisis ornare id at at ut arcu integer tristique placerat non turpis nibh turpis ullamcorper est porttitor.
                                </p>
                            </div>
                        </div>

                        <!-- Comment -->
                        <div class="border-bottom py-4 mt-2 mb-4">
                            <div class="d-flex align-items-center pb-1 mb-3">
                                <img class="rounded-circle" src="assets/img/avatar/07.jpg" width="48" alt="Comment author" />
                                <div class="ps-3">
                                    <h6 class="mb-0">Esther Howard</h6>
                                    <span class="fs-sm text-body-secondary">May 19, 2022</span>
                                </div>
                            </div>
                            <p class="pb-2 mb-0">Donec et sollicitudin tellus. Duis maximus, dui eget egestas mattis, purus ex tempor nulla, quis tempor sapien neque at nisl. Aliquam eu nisi ut nisl ultrices posuere. Praesent dignissim efficitur nisi, a hendrerit ipsum elementum sit amet. Vivamus non ante nisl. Nunc faucibus velit at eros mollis semper.</p>
                            <button class="nav-link fs-sm fw-semibold px-0 py-2" type="button">
                                Reply
                                <i class="ai-redo fs-xl ms-2"></i>
                            </button>
                        </div>

                        <!-- All comments button -->
                        <div class="text-end pb-5 mb-lg-1 mb-xl-3">
                            <a class="btn btn-link px-0" href="#">
                                Show all comments
                                <i class="ai-chevron-right fs-lg ms-1"></i>
                            </a>
                        </div>

                        <!-- Comment form -->
                        <div class="card border-0 bg-secondary pt-2 p-md-2 p-xl-3 p-xxl-4 mt-n3 mt-md-0">
                            <div class="card-body">
                                <h2 class="pb-2 pb-lg-3 pb-xl-4">Leave a comment</h2>
                                <form class="row needs-validation g-4" novalidate>
                                    <div class="col-sm-6">
                                        <label class="form-label" for="c-name">Name</label>
                                        <input class="form-control" type="text" placeholder="Your name" required id="c-name" />
                                        <div class="invalid-feedback">Please enter your name!</div>
                                    </div>
                                    <div class="col-sm-6">
                                        <label class="form-label" for="c-email">Email</label>
                                        <input class="form-control" type="email" placeholder="Your email" required id="c-email" />
                                        <div class="invalid-feedback">Please provide a valid email address!</div>
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label" for="c-comment">Comment</label>
                                        <textarea class="form-control" rows="4" placeholder="Type your comment here..." required id="c-comment"></textarea>
                                        <div class="invalid-feedback">Please enter a comment message!</div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="checkbox" id="c-save" />
                                            <label class="form-check-label" for="c-save">Save my name and email</label>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <button class="btn btn-primary" type="submit">Post a comment</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sidebar (offcanvas on sreens < 992px) -->
                <aside class="col-lg-3 offset-xl-1">
                    <div class="offcanvas-lg offcanvas-end" id="sidebar">
                        <div class="offcanvas-header">
                            <h4 class="offcanvas-title">Sidebar</h4>
                            <button class="btn-close ms-auto" type="button" data-bs-dismiss="offcanvas" data-bs-target="#sidebar" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <!-- Search box -->
                            <div class="position-relative mb-4 mb-lg-5">
                                <i class="ai-search position-absolute top-50 start-0 translate-middle-y ms-3"></i>
                                <input class="form-control ps-5" type="search" placeholder="Enter keyword" />
                            </div>

                            <!-- Popular posts -->
                            <h4 class="pt-1 pt-lg-0 mt-lg-n2">Most popular:</h4>
                            <div class="mb-lg-5 mb-4">
                                <article class="position-relative pb-2 mb-3 mb-lg-4">
                                    <img class="rounded-5" src="assets/img/blog/list/01.jpg" alt="Post image" />
                                    <h5 class="h6 mt-3 mb-0">
                                        <a class="stretched-link" href="blog-single-v1.html">The fashion for eco bags with vintage prints will still be relevant for more than one year</a>
                                    </h5>
                                </article>
                                <article class="position-relative">
                                    <img class="rounded-5" src="assets/img/blog/list/06.jpg" alt="Post image" />
                                    <h5 class="h6 mt-3 mb-0">
                                        <a class="stretched-link" href="blog-single-v2.html">A session with a psychologist as a personal choice or a fashion trend</a>
                                    </h5>
                                </article>
                            </div>

                            <!-- Recent posts -->
                            <h4 class="pt-3 pt-lg-1 mb-4">Recent posts:</h4>
                            <ul class="list-unstyled mb-lg-5 mb-4">
                                <li class="border-bottom pb-3 mb-3">
                                    <span class="h6 mb-0">
                                        <a href="blog-single-v1.html">Instagram trends that will definitely work and bring results in the new 2022</a>
                                    </span>
                                </li>
                                <li class="border-bottom pb-3 mb-3">
                                    <span class="h6 mb-0">
                                        <a href="blog-single-v2.html">A session with a psychologist as a personal choice</a>
                                    </span>
                                </li>
                                <li class="border-bottom pb-3 mb-3">
                                    <span class="h6 mb-0">
                                        <a href="blog-single-v1.html">Travel destinations to inspire and restore resources</a>
                                    </span>
                                </li>
                                <li class="border-bottom pb-3">
                                    <span class="h6 mb-0">
                                        <a href="blog-single-v2.html">How to look for inspiration for new goals in life?</a>
                                    </span>
                                </li>
                            </ul>

                            <!-- Relevant topics -->
                            <h4 class="pt-3 pt-lg-1 mb-4">Relevant topics:</h4>
                            <div class="d-flex flex-wrap mt-n3 ms-n3 mb-lg-5 mb-4 pb-3 pb-lg-0">
                                <a class="btn btn-outline-secondary rounded-pill mt-3 ms-3" href="#">Reading</a>
                                <a class="btn btn-outline-secondary rounded-pill mt-3 ms-3" href="#">Inspiration</a>
                                <a class="btn btn-outline-secondary rounded-pill mt-3 ms-3" href="#">Travel</a>
                                <a class="btn btn-outline-secondary rounded-pill mt-3 ms-3" href="#">Psychology</a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Sidebar toggle button -->
        <button class="d-lg-none btn btn-sm fs-sm btn-primary w-100 rounded-0 fixed-bottom" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar">
            <i class="ai-layout-column me-2"></i>
            Sidebar
        </button>
    `,
})
export class BlogviewerComponent implements OnInit {
    ngOnInit(): void {
        InitAnimateOnScroll();
        InitSmoothScroll();
    }
}
