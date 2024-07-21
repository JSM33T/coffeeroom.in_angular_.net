
export default function lightgalleryToImage() {
    const images = document.querySelectorAll<HTMLImageElement>("img");

    images.forEach((img) => {

        const galleryDiv = document.createElement("div");
        galleryDiv.classList.add("gallery");

        img.classList.add("gallery-item");
        img.style.cursor = "pointer";
        img.parentNode?.insertBefore(galleryDiv, img);
        galleryDiv.appendChild(img);

        const nextSibling = img.nextElementSibling;
        if (nextSibling && nextSibling.tagName.toLowerCase() === 'p') {
            const caption = nextSibling.innerHTML;
            img.setAttribute('data-sub-html', caption);
        }
    });

}
