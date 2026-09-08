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
    question: 'Are all electronic gadgets and smart devices authentic and backed by warranty?',
    answer: 'Yes, 100% of our electronic gadgets, smart wearables, and tech accessories are genuine and sourced directly from authorized brand distributors. All eligible products come with official manufacturer warranty coverage.',
    order: 1,
    isActive: true,
  },
  {
    question: 'What is your nationwide delivery timeframe and shipping coverage?',
    answer: 'We provide express delivery across Dhaka within 24 to 48 hours and reliable courier shipping to all 64 districts in Bangladesh within 2 to 4 business days. Safe, shockproof packaging and tracking are included with every shipment.',
    order: 2,
    isActive: true,
  },
  {
    question: 'What payment methods are accepted for orders?',
    answer: 'We accept Cash on Delivery (COD) across Bangladesh as well as seamless digital payments via bKash, Nagad, Visa, Mastercard, and major mobile banking gateways.',
    order: 3,
    isActive: true,
  },
  {
    question: 'What is your replacement policy if I receive a defective gadget or wrong size apparel?',
    answer: 'We offer an easy 7-day replacement guarantee. If you encounter any technical defect, physical damage during transit, or sizing issue with fashion wear, simply contact our support team with your order ID for a swift exchange.',
    order: 4,
    isActive: true,
  },
  {
    question: 'How can I track my order or contact customer care?',
    answer: 'You can track your order status in real time directly on our website using your order ID or phone number. For instant customer care, chat with our 24/7 AI Assistant or reach out via WhatsApp at +8801581680540.',
    order: 5,
    isActive: true,
  },
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
