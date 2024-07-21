//@ts-nocheck

let galleryInstances = [];

export function initializeLightGallery() {
    // Check if lightGallery is already initialized
    if (window['intiLightGalleryInitialized']) {
        return;
    }

    const gallery = document.querySelectorAll<any>('.gallery');

    if (gallery.length) {
      for (let i = 0; i < gallery.length; i++) {
        const thumbnails = gallery[i].dataset.thumbnails ? true : false;
        const video = gallery[i].dataset.video ? true : false;
        const defaultPlugins = [lgZoom, lgFullscreen];
        const videoPlugin = video ? [lgVideo] : [];
        const thumbnailPlugin = thumbnails ? [lgThumbnail] : [];
        const plugins = [...defaultPlugins, ...videoPlugin, ...thumbnailPlugin];
    
        const instance = lightGallery(gallery[i], {
          selector: '.gallery-item',
          plugins: plugins,
          licenseKey: 'D4194FDD-48924833-A54AECA3-D6F8E646',
          download: false,
          autoplayVideoOnSlide: true,
          zoomFromOrigin: false,
          youtubePlayerParams: {
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

        // Store the instance for potential future deinitialization
        galleryInstances.push(instance);
      }
    }

    // Mark lightGallery as initialized
    window['intiLightGalleryInitialized'] = true;
}

export function deinitializeLightGallery() {
    // Deinitialize existing gallery instances
    galleryInstances.forEach(instance => {
        instance.destroy();
    });
    galleryInstances = [];
    window['intiLightGalleryInitialized'] = false;
}
