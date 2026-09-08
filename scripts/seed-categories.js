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
    name: 'Fashion & Lifestyle',
    slug: 'fashion-lifestyle',
    image: '/assets/images/cagetory/fashion-lifestyle.webp',
    isActive: true,
  },
  {
    name: 'Health & Beauty Care',
    slug: 'health-beauty-care',
    image: '/assets/images/cagetory/health-beauty-care.webp',
    isActive: true,
  },
  {
    name: 'Books & Tree',
    slug: 'books-tree',
    image: '/assets/images/cagetory/books-tree.webp',
    isActive: true,
  },
  {
    name: 'Electric & Electronics Security',
    slug: 'electric-electronics-security',
    image: '/assets/images/cagetory/electric-electronics-security.webp',
    isActive: true,
  },
  {
    name: 'Grocery Food & Bakery',
    slug: 'grocery-food-bakery',
    image: '/assets/images/cagetory/grocery-food-bakery.webp',
    isActive: true,
  },
];

async function seedCategories() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected successfully to MongoDB.');

    for (const cat of categoriesToSeed) {
      const existing = await Category.findOne({ slug: cat.slug });
      if (existing) {
        existing.name = cat.name;
        existing.image = cat.image;
        existing.isActive = true;
        await existing.save();
        console.log(`🔄 Updated category: ${cat.name} (${cat.slug})`);
      } else {
        await Category.create(cat);
        console.log(`✨ Created category: ${cat.name} (${cat.slug})`);
      }
    }

    const allCategories = await Category.find({});
    console.log(`\n🎉 Total categories in database: ${allCategories.length}`);
    allCategories.forEach((c, idx) => {
      console.log(`${idx + 1}. ${c.name} -> ${c.image}`);
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
