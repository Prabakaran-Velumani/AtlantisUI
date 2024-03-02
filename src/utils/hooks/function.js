export async function preloadedImages(imageList) {
  const preloadedImages = {};
    // Function to preload a single image
  async function preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img.src);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  }

 await Promise.all(
    imageList.map(async (item) => {
      try {
        const preloadedUrl = await preloadImage(item.src);
        preloadedImages[item.assetType] = preloadedUrl;
      } catch (error) {
        console.error(error);
      }
    })
  );

  return preloadedImages;
}

