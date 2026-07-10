import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicProductsDir = path.join(process.cwd(), 'public', 'assets', 'products');

async function convertImages() {
  try {
    if (!fs.existsSync(publicProductsDir)) {
      console.log('Directory not found:', publicProductsDir);
      return;
    }
    
    const files = fs.readdirSync(publicProductsDir);
    
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        const inputPath = path.join(publicProductsDir, file);
        const fileNameWithoutExt = path.parse(file).name;
        const outputPath = path.join(publicProductsDir, `${fileNameWithoutExt}.webp`);
        
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`Converted: ${file} -> ${fileNameWithoutExt}.webp`);
        
        // Delete original file to save space and enforce webp usage
        fs.unlinkSync(inputPath);
      }
    }
    console.log('All images converted successfully!');
  } catch (error) {
    console.error('Error during conversion:', error);
  }
}

convertImages();
