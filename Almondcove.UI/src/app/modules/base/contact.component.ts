import { Component, OnDestroy, OnInit } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';
import acToast from '../../library/modals/notification-modal';
import InitAnimateOnScroll from '../../library/invokers/animate-on-scroll';
import InitSmoothScroll from '../../library/invokers/smooth-scroll';

@Component({
  selector: 'app-contact',
  template: `
    <section class="container pt-5 pb-lg-2 pb-xl-4 py-xxl-5 my-5">
      <nav aria-label="breadcrumb">
        <ol class="pt-lg-3 pb-lg-4 pb-2 breadcrumb">
          <li class="breadcrumb-item">
            <a routerLink="/" data-aos="flip-down" data-aos-duration="900"
              >Home</a
            >
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
            data-aos="flip-down"
            data-aos-duration="900"
          >
            Contacts v.2
          </li>
        </ol>
      </nav>

      <div class="row pb-1 pb-sm-3 pb-lg-4">
        <div class="col-lg-4 pe-xxl-4">
          <!-- Page title -->
          <h1 class="display-2" data-aos="flip-up" data-aos-duration="200">
            Contacts
          </h1>
          <p
            class="fs-lg pb-4 mb-0 mb-sm-2"
            data-aos="flip-up"
            data-aos-duration="500"
          >
            Get in touch with us by completing the below form or call us now
          </p>
        </div>
        <div class="col-lg-8 col-xl-7 offset-xl-1">
          <!-- Contact form -->
          <form class="row g-4 needs-validation" novalidate>
            <div class="col-sm-6">
              <label class="form-label fs-base" for="name">Name</label>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your name"
                required
                id="name"
              />
              <div class="invalid-feedback">Please enter your name!</div>
            </div>
            <div class="col-sm-6">
              <label class="form-label fs-base" for="email">Email</label>
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email address"
                required
                id="email"
              />
              <div class="invalid-feedback">
                Please provide a valid email address!
              </div>
            </div>
            <div class="col-sm-6">
              <label class="form-label fs-base" for="phone">Phone</label>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Phone number"
                id="phone"
              />
            </div>
            <div class="col-sm-6">
              <label class="form-label fs-base" for="location">Location</label>
              <select class="form-select form-select-lg" id="location">
                <option value="All locations">General</option>
                <option value="Asia and Pacific">Feature Request</option>
                <option value="Asia and Pacific">Feedback/Report</option>
              </select>
            </div>
            <div class="col-sm-12">
              <label class="form-label fs-base" for="message"
                >How can we help?</label
              >
              <textarea
                class="form-control form-control-lg"
                rows="5"
                placeholder="Enter your message here..."
                required
                id="message"
              ></textarea>
              <div class="invalid-feedback">Please enter your message!</div>
            </div>
            <div class="col-sm-12">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="agree" />
                <label class="form-check-label" for="agree"
                  >I agree to the
                  <a
                    class="nav-link d-inline fs-normal text-decoration-underline p-0"
                    href="#"
                    >Terms &amp; Conditions</a
                  ></label
                >
              </div>
            </div>
            <div class="col-sm-12 pt-2">
              <button
                class="btn btn-lg btn-primary"
                (click)="haha()"
                type="button"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent implements OnInit, OnDestroy {
  loadingBarState: any;

  constructor(private loadingBar: LoadingBarService) {}

  ngOnInit(): void {
    this.loadingBarState = this.loadingBar.useRef();

    this.loadingBarState.start();
    InitAnimateOnScroll();
    InitSmoothScroll();
    this.loadingBarState.complete();
  }

  ngOnDestroy(): void {
    this.loadingBarState.complete();
  }
  haha(): void {
    acToast('wait', 'the component is still in the oven');
  }
}
