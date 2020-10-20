export default function changePhoto() {
    const photos = document.querySelector('.command');
    let originalPhoto;
    photos.addEventListener('mouseover', (evt => {
        if (evt.target.matches('.command__photo')) {
            originalPhoto = evt.target.src;
            evt.target.src = evt.target.dataset.img
        }
        photos.addEventListener('mouseout', (evt => {
            if (evt.target.matches('.command__photo')) {
                evt.target.src = originalPhoto;
            }
        }))
    }))
}
