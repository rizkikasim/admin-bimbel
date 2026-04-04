function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
}

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export async function getCroppedImageFile(imageSrc, pixelCrop, rotation = 0, fileName = 'gallery-cropped.jpg') {
  const image = await createImage(imageSrc);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to prepare image canvas.');
  }

  const rotRad = getRadianAngle(rotation);
  const { width: rotatedWidth, height: rotatedHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = rotatedWidth;
  canvas.height = rotatedHeight;

  ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedImage = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  const outputCanvas = document.createElement('canvas');
  const outputCtx = outputCanvas.getContext('2d');

  if (!outputCtx) {
    throw new Error('Failed to prepare cropped canvas.');
  }

  outputCanvas.width = pixelCrop.width;
  outputCanvas.height = pixelCrop.height;
  outputCtx.putImageData(croppedImage, 0, 0);

  const blob = await new Promise((resolve, reject) => {
    outputCanvas.toBlob(
      (generatedBlob) => {
        if (generatedBlob) {
          resolve(generatedBlob);
          return;
        }
        reject(new Error('Failed to generate cropped image.'));
      },
      'image/jpeg',
      0.92
    );
  });

  return new File([blob], fileName, { type: 'image/jpeg' });
}
