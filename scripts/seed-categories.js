const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// ── ENV PARSING ────────────────────────────────────────────
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

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    image: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'categories' }
);

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const categoriesToSeed = [
  {
    name: 'Smart Wearables',
    slug: 'smart-wearables',
    image: '/assets/images/cagetory/Smart Wearables.webp',
    isActive: true,
  },
  {
    name: 'Audio & Sound',
    slug: 'audio-sound',
    image: '/assets/images/cagetory/Audio & Sound.webp',
    isActive: true,
  },
  {
    name: 'Smartphones & Tablets',
    slug: 'smartphones-tablets',
    image: '/assets/images/cagetory/Smartphones & Tablets.webp',
    isActive: true,
  },
  {
    name: 'Trendy Fashion Wear',
    slug: 'trendy-fashion-wear',
    image: '/assets/images/cagetory/Trendy Fashion Wear.webp',
    isActive: true,
  },
  {
    name: 'Fashion Accessories',
    slug: 'fashion-accessories',
    image: '/assets/images/cagetory/Fashion Accessories.webp',
    isActive: true,
  },
];

async function seedCategories() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected successfully to MongoDB.');

    // Clear obsolete categories if needed or upsert
    // Let's remove older unrelated categories (e.g. food/books/groceries) if any
    const deleteResult = await Category.deleteMany({});
    console.log(`🧹 Cleared ${deleteResult.deletedCount} existing categories.`);

    for (const cat of categoriesToSeed) {
      await Category.create(cat);
      console.log(`✨ Created category: ${cat.name} (${cat.slug}) -> ${cat.image}`);
    }

    const allCategories = await Category.find({});
    console.log(`\n🎉 Total categories in database: ${allCategories.length}`);
    allCategories.forEach((c, idx) => {
      console.log(`${idx + 1}. ${c.name} (${c.slug}) -> ${c.image}`);
    });
  } catch (error) {
    console.error('❌ Error during category seeding:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedCategories();
