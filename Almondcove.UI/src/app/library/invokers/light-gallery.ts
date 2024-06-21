import lightGallery from "lightgallery";
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgVideo from 'lightgallery/plugins/video';

export default function InitLightGallery() {
  
    const galleries = document.querySelectorAll('.gallery');

    if (galleries.length) {
      galleries.forEach(gallery => {
        const galleryElement = gallery as HTMLElement;
        const thumbnails = galleryElement.dataset['thumbnails'] ? true : false;
        const video = galleryElement.dataset['video'] ? true : false;
        const defaultPlugins = [lgZoom, lgFullscreen];
        const videoPlugin = video ? [lgVideo] : [];
        const thumbnailPlugin = thumbnails ? [lgThumbnail] : [];
        const plugins = [...defaultPlugins, ...videoPlugin, ...thumbnailPlugin];

        lightGallery(galleryElement, {
          selector: '.gallery-item',
          plugins: plugins,
          licenseKey: 'D4194FDD-48924833-A54AECA3-D6F8E646',
          download: false,
          autoplayVideoOnSlide: true,
          zoomFromOrigin: false,
          youTubePlayerParams: {
            modestbranding: 1,
            showinfo: 0,
            rel: 0,
          },
          vimeoPlayerParams: {
            byline: 0,
            portrait: 0,
            color: '6366f1',
          },
        });
      });
    }
  
}
