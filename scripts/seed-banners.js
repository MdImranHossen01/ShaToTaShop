const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local file to get MONGODB_URI
const envPath = path.join(__dirname, '../.env.local');
let mongodbUri = '';

if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.charCodeAt(0) === 0xFEFF) envContent = envContent.slice(1);
  const lines = envContent.split(/\r?\n/);
  for (const line of lines) {
    if (line.startsWith('MONGODB_URI=')) {
      mongodbUri = line.substring('MONGODB_URI='.length).trim().replace(/['"\r]/g, '');
      break;
    }
  }
}

if (!mongodbUri) {
  console.error('❌ Could not read MONGODB_URI from .env.local');
  process.exit(1);
}

console.log('Connecting to MongoDB...');

const BannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String },
    primaryBtnText: { type: String },
    primaryBtnLink: { type: String },
    secondaryBtnText: { type: String },
    secondaryBtnLink: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);

const primaryLink = 'https://shatotashop-jia.vercel.app/shop';
const secondaryLink = 'https://wa.me/8801581680540';

const banners = [
  {
    title: 'Step Into Style & Innovation',
    image: '/assets/images/Banner/Step Into Style & Innovation.webp',
    link: primaryLink,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: primaryLink,
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: secondaryLink,
    order: 1,
    isActive: true,
  },
  {
    title: 'Next-Gen Audio Experience',
    image: '/assets/images/Banner/Next-Gen Audio Experience.webp',
    link: primaryLink,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: primaryLink,
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: secondaryLink,
    order: 2,
    isActive: true,
  },
  {
    title: 'Premium Wearables & Accessories',
    image: '/assets/images/Banner/Premium Wearables & Accessories.webp',
    link: primaryLink,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: primaryLink,
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: secondaryLink,
    order: 3,
    isActive: true,
  },
  {
    title: 'Smart Tech, Smarter Living',
    image: '/assets/images/Banner/Smart Tech Smarter Living.webp',
    link: primaryLink,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: primaryLink,
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: secondaryLink,
    order: 4,
    isActive: true,
  },
  {
    title: 'Urban Fashion Collection',
    image: '/assets/images/Banner/Urban Fashion Collection.webp',
    link: primaryLink,
    primaryBtnText: 'Shop Now',
    primaryBtnLink: primaryLink,
    secondaryBtnText: 'Contact Us',
    secondaryBtnLink: secondaryLink,
    order: 5,
    isActive: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected to MongoDB successfully.');

    // Clear existing banners
    const deleteResult = await Banner.deleteMany({});
    console.log(`🧹 Cleared ${deleteResult.deletedCount} existing banners.`);

    // Insert new banners
    const insertResult = await Banner.insertMany(banners);
    console.log(`🎉 Seeded ${insertResult.length} banners successfully:`);
    insertResult.forEach((b, i) => {
      console.log(`[Banner ${i + 1}] Title: "${b.title}", Image: "${b.image}", Primary: "${b.primaryBtnLink}", Secondary: "${b.secondaryBtnLink}"`);
    });

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seed();
