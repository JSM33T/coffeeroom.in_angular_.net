import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './modules/base/about.component';
import { HomeComponent } from './modules/base/home.component';
import { ContactComponent } from './modules/base/contact.component';

const routes: Routes = [
 
  {
    path: 'about',
    component:AboutComponent,
  },
  {
    path: '',
    component:HomeComponent,
  },
  {
    path: 'contact',
    component:ContactComponent,
  },
  {  
    path: 'gallery',  
    loadChildren: () => import('./modules/gallery/gallery.module').then(m => m.GalleryModule)  
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
