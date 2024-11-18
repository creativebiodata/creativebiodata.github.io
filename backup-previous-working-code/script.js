// Zoom functionality
const images = document.querySelectorAll('.sample-item img');
const modal = document.getElementById('zoom-modal');
const modalImage = document.getElementById('zoom-image');
const modalPrice = document.getElementById('zoom-price');
const closeModal = document.getElementById('close-modal');
const whatsappShare = document.getElementById('whatsapp-share');

// Loop through each image and add a click event listener
images.forEach((img) => {
  img.addEventListener('click', () => {
    const price = img.dataset.price;  // Get the price from data-price attribute
    const src = img.src.split('?')[0];  // Clean up any query parameters from the image source

    modalImage.src = src;  // Set the image in the zoom modal
    modalPrice.textContent = `Price: ${price}`;  // Set the price in the modal
    whatsappShare.href = `https://wa.me/?text=Hi, I am interested in purchasing this biodata template for ${price}.`;  // Set WhatsApp link

    modal.style.display = 'flex';  // Show the modal
  });
});

// Close the modal when the close button is clicked
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal if clicked outside of the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});