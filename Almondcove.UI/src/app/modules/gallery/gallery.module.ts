import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { FormsModule } from '@angular/forms';

const routes = [
    {
        path: '',
        component: HomeComponent,
    },
    { path: 'album/:slug', component: AlbumComponent },
];

@NgModule({
    declarations: [HomeComponent, AlbumComponent],
    imports: [CommonModule, FormsModule, LightgalleryModule, RouterModule.forChild(routes)],
})
export class GalleryModule {}
