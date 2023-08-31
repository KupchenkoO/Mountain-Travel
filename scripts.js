const burgerMenu = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const closeButton = document.createElement('span');
closeButton.classList.add('close-button');
closeButton.innerHTML = '&times;';

burgerMenu.addEventListener('click', () => {
  menu.classList.toggle('active');
  if (menu.classList.contains('active')) {
    menu.appendChild(closeButton);
  } else {
    menu.removeChild(closeButton);
  }
});

closeButton.addEventListener('click', () => {
  menu.classList.remove('active');
  menu.removeChild(closeButton);
});

// галерея
const galleryPhotos = document.querySelectorAll('.gallery-photo');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const currentPageSpan = document.getElementById('current-page');
const totalPagesSpan = document.getElementById('total-pages');

let currentPhotoIndex = 0;
showPhoto(currentPhotoIndex);
function showPhoto(index) {
    galleryPhotos.forEach((photo, idx) => {
        if (idx === index) {
            photo.style.display = 'block';
        } else {
            photo.style.display = 'none';
        }
    });
    const formattedIndex = (index + 1).toString().padStart(2, '0'); 
    currentPageSpan.textContent = formattedIndex;
}

prevButton.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    showPhoto(currentPhotoIndex);
});

nextButton.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
    showPhoto(currentPhotoIndex);
});

// totalPagesSpan.textContent = galleryPhotos.length.toString().padStart(2, '0'); 
// showPhoto(currentPhotoIndex);
// товари
window.addEventListener('click', function (event) {

    let counter;
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus'){
      const counterWrapper = event.target.closest('.counterblock');
      counter = counterWrapper.querySelector('[data-counter]');
    }
    if (event.target.dataset.action === 'plus'){
      counter.innerText = ++counter.innerText;
    }
    if (event.target.dataset.action === 'minus'){
      if (parseInt(counter.innerText) > 1){
            counter.innerText = --counter.innerText;
            }
            else if (event.target.closest('.product-buy') && parseInt(counter.innerText) == 1){
                event.target.closest('.product-item').remove();
            }
    }
});
const productWrapper = document.querySelector('.product-buy');
window.addEventListener('click', function (event) {
    if (event.target.hasAttribute('data-cart')){
        const card = event.target.closest('.item');
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            price: card.querySelector('.price-p').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };


        const itemInProduct = productWrapper.querySelector(`[data-id="${productInfo.id}"]`);
        if (itemInProduct){
           const counterElement = itemInProduct.querySelector('[data-counter]');
           counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else{

        

        const productItemHtml = `<div class="product-buy">
        <div class="product-item" data-id="${productInfo.id}">
        <div class="product-item-top">
            <div class="product-image">
                <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
            </div>
            <div class="product-item-desc">
                <div class="product-item-title">${productInfo.title}</div>
                <div class="item-small counterblock">
                    <button class="item-control" data-action="minus">-</button>
                    <div class="current" data-counter>${productInfo.counter}</div>
                    <button class="item-control" data-action="plus">+</button>
                </div>
                <div class="price">
                    <div class="price-p">${productInfo.price}</div>
                </div>

    </div>
        </div>
            </div>

    </div>`;
        productWrapper.insertAdjacentHTML('beforeend', productItemHtml)
        }

        card.querySelector('[data-counter]').innerText ='1';
    }
});

document.getElementById("openPopup").addEventListener('click', function(){
    document.getElementById('popup').style.display = "flex";
});
document.getElementById("closePopup").addEventListener('click', function(){
    document.getElementById('popup').style.display = "none";
});

