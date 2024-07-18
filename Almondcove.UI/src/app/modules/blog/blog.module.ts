import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BloghomeComponent } from './bloghome/bloghome.component';
import { BlogviewerComponent } from './blogviewer/blogviewer.component';

const routes = [
    {
        path: '',
        component: BloghomeComponent,
    },
    { path: 'view', component: BlogviewerComponent },
];

@NgModule({
    declarations: [BlogviewerComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BlogModule {}
