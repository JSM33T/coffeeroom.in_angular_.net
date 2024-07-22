import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
      path: '',
      component: AppsComponent,
  }
];

@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AppsModule { }
