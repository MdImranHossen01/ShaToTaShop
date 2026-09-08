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

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: 'faqs' }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqs = [
  {
    question: 'What types of products are available at Bhoot Bazar?',
    answer: 'Bhoot Bazar is a curated multi-category lifestyle e-commerce platform offering premium fashion & apparel, health & botanical beauty care, books & indoor flora, smart electronics & security gadgets, and artisanal bakery & gourmet grocery essentials.',
    order: 1,
    isActive: true,
  },
  {
    question: 'How long does nationwide delivery take?',
    answer: 'Orders within Dhaka are typically delivered within 24 to 48 hours. For deliveries outside Dhaka across Bangladesh, standard delivery takes 3 to 5 business days with real-time tracking support.',
    order: 2,
    isActive: true,
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We provide seamless Cash on Delivery (COD) as well as secure online payments via bKash, Nagad, Rocket, credit/debit cards, and mobile banking gateways.',
    order: 3,
    isActive: true,
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'We offer a hassle-free 7-day return and exchange policy. If you receive a damaged, defective, or incorrect item, simply contact our support team with your order ID for a prompt resolution.',
    order: 4,
    isActive: true,
  },
  {
    question: 'How can I get in touch with customer support?',
    answer: 'Our customer care team is available 24/7. You can reach out directly via WhatsApp at +8801521100827, call our helpline, or use the live AI assistant on our website.',
    order: 5,
    isActive: true,
  }
];

async function seed() {
  try {
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected to MongoDB successfully.');

    // Clear existing FAQs
    const deleteResult = await FAQ.deleteMany({});
    console.log(`🧹 Cleared ${deleteResult.deletedCount} existing FAQs.`);

    // Insert new English FAQs
    const insertResult = await FAQ.insertMany(faqs);
    console.log(`🎉 Seeded ${insertResult.length} English FAQs successfully:`);
    insertResult.forEach((f, i) => {
      console.log(`[FAQ ${i + 1}] Q: "${f.question}"`);
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
