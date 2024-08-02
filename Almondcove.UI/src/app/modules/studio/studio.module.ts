import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { HttpClientModule } from '@angular/common/http';

const routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
      path: ':slug',
      component: ViewerComponent,
  }
];

@NgModule({
    declarations: [HomeComponent, ViewerComponent],
    imports: [CommonModule,HttpClientModule ,RouterModule.forChild(routes)],
})
export class StudioModule {}
