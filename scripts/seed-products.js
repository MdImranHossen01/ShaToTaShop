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

// Schemas
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String },
    image: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { collection: 'categories' }
);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    salePrice: { type: Number },
    discountRate: { type: Number, default: 0 },
    purchasePrice: { type: Number },
    sku: { type: String, unique: true },
    stock: { type: Number, default: 50 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    tags: [String],
    images: [String],
    attributes: [{ key: String, value: String }],
    isFeatured: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isFlashSale: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    ratings: { type: Number, default: 5 },
    numReviews: { type: Number, default: 12 },
  },
  { timestamps: true, collection: 'products' }
);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

async function seedProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongodbUri);
    console.log('✅ Connected to MongoDB successfully.');

    // Fetch the 5 categories
    const wearablesCat = await Category.findOne({ slug: 'smart-wearables' });
    const audioCat = await Category.findOne({ slug: 'audio-sound' });
    const phonesCat = await Category.findOne({ slug: 'smartphones-tablets' });
    const wearCat = await Category.findOne({ slug: 'trendy-fashion-wear' });
    const accessoriesCat = await Category.findOne({ slug: 'fashion-accessories' });

    if (!wearablesCat || !audioCat || !phonesCat || !wearCat || !accessoriesCat) {
      console.error('❌ One or more categories not found. Please run seed-categories.js first.');
      process.exit(1);
    }

    const productsData = [
      // ═══════════════════════════════════════════════════════════
      // CATEGORY 1: SMART WEARABLES (5 Products)
      // ═══════════════════════════════════════════════════════════
      {
        name: 'Chronos Lux Smartwatch Pro',
        slug: 'chronos-lux-smartwatch-pro',
        description: 'Premium aerospace-grade titanium bezel smartwatch featuring a vivid 1.43-inch AMOLED Always-On display, crisp Bluetooth calling, AI voice assistant, 120+ sports tracking modes, and 10-day battery life.',
        price: 7500,
        salePrice: 5990,
        purchasePrice: 4200,
        discountRate: 20,
        sku: 'GADGET-WATCH-001',
        stock: 45,
        categories: [wearablesCat._id],
        tags: ['Smartwatch', 'AMOLED', 'Fitness', 'Bluetooth Calling', 'FlashSale', 'Featured'],
        images: ['/assets/images/products/chronos_lux_smartwatch.webp'],
        attributes: [
          { key: 'Display', value: '1.43" AMOLED 466x466' },
          { key: 'Battery Life', value: 'Up to 10 Days' },
          { key: 'Water Resistance', value: 'IP68 & 3ATM' },
          { key: 'Connectivity', value: 'Bluetooth 5.3' },
        ],
        isFeatured: true,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 38,
      },
      {
        name: 'Aero Active Sport Watch',
        slug: 'aero-active-sport-watch',
        description: 'Engineered for athletes and outdoor adventurers. Includes high-precision dual-band GPS, continuous dynamic heart rate & SpO2 blood oxygen tracking, 5ATM swim-proof rating, and sweat-resistant silicone strap.',
        price: 4200,
        salePrice: 3490,
        purchasePrice: 2400,
        discountRate: 17,
        sku: 'GADGET-WATCH-002',
        stock: 60,
        categories: [wearablesCat._id],
        tags: ['Sport Watch', 'GPS', 'Fitness Tracker', 'Waterproof', 'FlashSale'],
        images: ['/assets/images/products/aero_watch_active.webp'],
        attributes: [
          { key: 'Display', value: '1.39" HD Color Touchscreen' },
          { key: 'Sensors', value: 'Dual GPS, PPG Heart Rate, SpO2' },
          { key: 'Waterproof Rating', value: '5ATM Swimproof' },
          { key: 'Battery', value: '380mAh (Up to 14 Days)' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.8,
        numReviews: 24,
      },
      {
        name: 'Helix Titanium Smart Ring',
        slug: 'helix-titanium-smart-ring',
        description: 'Revolutionary health tracking in an ultra-lightweight biocompatible titanium ring. Continuously tracks sleep cycles, body temperature recovery, HRV, steps, and activity without the bulk of a wristband.',
        price: 8900,
        salePrice: 8900,
        purchasePrice: 5800,
        discountRate: 0,
        sku: 'GADGET-RING-001',
        stock: 30,
        categories: [wearablesCat._id],
        tags: ['Smart Ring', 'Health Tracking', 'Titanium', 'New Arrival', 'Featured'],
        images: ['/assets/images/products/helix_smart_ring.webp'],
        attributes: [
          { key: 'Material', value: 'Grade-5 Medical Titanium' },
          { key: 'Tracking', value: 'Sleep, HRV, Body Temp, SpO2' },
          { key: 'Battery Life', value: '6-7 Days Per Charge' },
          { key: 'Water Resistance', value: '100M / 10ATM' },
        ],
        isFeatured: true,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 5.0,
        numReviews: 19,
      },
      {
        name: 'Nexus Smart Band 5',
        slug: 'nexus-smart-band-5',
        description: 'Sleek, lightweight fitness band with an expansive 1.47" bezel-less AMOLED touchscreen, all-day stress and sleep monitoring, female health tracking, 14-day battery life, and magnetic snap charging.',
        price: 2600,
        salePrice: 2600,
        purchasePrice: 1700,
        discountRate: 0,
        sku: 'GADGET-BAND-001',
        stock: 80,
        categories: [wearablesCat._id],
        tags: ['Fitness Band', 'AMOLED', 'Activity Tracker', 'New Arrival'],
        images: ['/assets/images/products/nexus_smart_band_5.webp'],
        attributes: [
          { key: 'Display', value: '1.47" AMOLED' },
          { key: 'Battery Life', value: '14 Days Typical Use' },
          { key: 'Modes', value: '96 Workout Modes' },
          { key: 'Weight', value: '16g (Ultra Light)' },
        ],
        isFeatured: false,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.7,
        numReviews: 42,
      },
      {
        name: 'Aura Sleep & Recovery Band',
        slug: 'aura-sleep-recovery-band',
        description: 'Screenless, distraction-free recovery tracker with ultra-soft fabric strap. Measures sleep efficiency, deep REM stages, daily physical strain, and resting heart rate for peak lifestyle performance.',
        price: 3800,
        salePrice: 3800,
        purchasePrice: 2500,
        discountRate: 0,
        sku: 'GADGET-BAND-002',
        stock: 35,
        categories: [wearablesCat._id],
        tags: ['Sleep Tracker', 'Recovery Band', 'Health Gadget'],
        images: ['/assets/images/products/aura_sleep_tracker.webp'],
        attributes: [
          { key: 'Design', value: 'Screenless Soft Weave Band' },
          { key: 'Tracking', value: 'Circadian Rhythm, Sleep Quality, Recovery' },
          { key: 'Battery', value: '5 Days Continuous' },
          { key: 'App Support', value: 'iOS & Android Sync' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.6,
        numReviews: 15,
      },

      // ═══════════════════════════════════════════════════════════
      // CATEGORY 2: AUDIO & SOUND (5 Products)
      // ═══════════════════════════════════════════════════════════
      {
        name: 'Sonic Wireless ANC Earbuds',
        slug: 'sonic-wireless-anc-earbuds',
        description: 'Hybrid Active Noise Cancelling (ANC) true wireless earbuds with 42dB ambient sound reduction, 10mm graphene composite drivers, transparency mode, 40-hour battery reserve with wireless charging case.',
        price: 3200,
        salePrice: 2450,
        purchasePrice: 1600,
        discountRate: 23,
        sku: 'AUDIO-TWS-001',
        stock: 75,
        categories: [audioCat._id],
        tags: ['Earbuds', 'TWS', 'ANC', 'Wireless Audio', 'FlashSale', 'Featured'],
        images: ['/assets/images/products/sonic_buds_wireless.webp'],
        attributes: [
          { key: 'Noise Cancellation', value: '42dB Hybrid ANC + Quad Mic ENC' },
          { key: 'Playtime', value: '8H (Earbuds) + 32H (Case)' },
          { key: 'Driver', value: '10mm Dynamic Graphene' },
          { key: 'Latency', value: '45ms Low Latency Gaming Mode' },
        ],
        isFeatured: true,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 53,
      },
      {
        name: 'Tempo Studio Wireless Headphones',
        slug: 'tempo-studio-wireless-headphones',
        description: 'Audiophile-grade over-ear wireless headphones with custom 40mm bio-cellulose drivers, Hi-Res Audio certification, ultra-soft protein leather ear cushions, multi-point pairing, and 60-hour massive playback time.',
        price: 6800,
        salePrice: 5200,
        purchasePrice: 3800,
        discountRate: 24,
        sku: 'AUDIO-HEADPHONE-001',
        stock: 40,
        categories: [audioCat._id],
        tags: ['Headphones', 'Hi-Res Audio', 'Studio Sound', 'Over-Ear', 'FlashSale'],
        images: ['/assets/images/products/tempo_anc_headphones.webp'],
        attributes: [
          { key: 'Audio Format', value: 'Hi-Res Certified, LDAC & AAC' },
          { key: 'Battery Life', value: 'Up to 60 Hours (Fast Charge: 5min = 4H)' },
          { key: 'ANC Type', value: 'Adaptive Hybrid Noise Cancelling' },
          { key: 'Weight', value: '250g Ergonomic Comfort' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 31,
      },
      {
        name: 'Echo Pulse 360 Bluetooth Speaker',
        slug: 'echo-pulse-360-bluetooth-speaker',
        description: 'Compact 20W portable speaker delivering immersive 360-degree surround sound with dual passive bass radiators, customizable multi-color RGB ambient lighting ring, IPX7 waterproof body, and TWS stereo pairing.',
        price: 3600,
        salePrice: 3600,
        purchasePrice: 2200,
        discountRate: 0,
        sku: 'AUDIO-SPEAKER-001',
        stock: 50,
        categories: [audioCat._id],
        tags: ['Bluetooth Speaker', 'RGB Lighting', 'Waterproof', 'New Arrival', 'Featured'],
        images: ['/assets/images/products/echo_pulse_speaker.webp'],
        attributes: [
          { key: 'Output Power', value: '20W Peak Stereo' },
          { key: 'Battery Life', value: '18 Hours Playback' },
          { key: 'Waterproof', value: 'IPX7 Submersible' },
          { key: 'Lighting', value: 'RGB Dynamic Light Ring' },
        ],
        isFeatured: true,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.8,
        numReviews: 27,
      },
      {
        name: 'Soundwave Cinematic Home Soundbar',
        slug: 'soundwave-cinematic-home-soundbar',
        description: 'Elevate your living room and TV audio with the 120W Soundwave soundbar. Features dedicated wireless subwoofer, Dolby Digital audio processing, Optical, HDMI ARC, Bluetooth 5.3, and 3 EQ acoustic sound modes.',
        price: 11500,
        salePrice: 11500,
        purchasePrice: 8200,
        discountRate: 0,
        sku: 'AUDIO-SOUNDBAR-001',
        stock: 25,
        categories: [audioCat._id],
        tags: ['Soundbar', 'Home Theater', 'Dolby Audio', 'Wireless Subwoofer', 'Featured'],
        images: ['/assets/images/products/soundwave_soundbar.webp'],
        attributes: [
          { key: 'Total Power', value: '120W Peak Output' },
          { key: 'Inputs', value: 'HDMI ARC, Optical, AUX, USB, BT 5.3' },
          { key: 'Subwoofer', value: '5.25" Wireless Deep Bass' },
          { key: 'Audio Tech', value: 'Dolby Digital & 3D Surround' },
        ],
        isFeatured: true,
        isNewArrival: false,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.9,
        numReviews: 18,
      },
      {
        name: 'Vocal Pro Wireless Lavalier Microphone',
        slug: 'vocal-pro-wireless-lavalier-microphone',
        description: 'Dual-channel plug-and-play wireless mic system for content creators, vloggers, and streamers. Includes DSP real-time noise reduction, 200-meter transmission range, and dual Type-C/Lightning receiver adapters.',
        price: 2800,
        salePrice: 2800,
        purchasePrice: 1750,
        discountRate: 0,
        sku: 'AUDIO-MIC-001',
        stock: 65,
        categories: [audioCat._id],
        tags: ['Microphone', 'Vlogging', 'Wireless Mic', 'Content Creator', 'New Arrival'],
        images: ['/assets/images/products/vocal_pro_mic.webp'],
        attributes: [
          { key: 'Range', value: '200M Barrier-Free Transmission' },
          { key: 'Noise Reduction', value: '3-Level DSP Smart Chip' },
          { key: 'Battery', value: '24H with Charging Case' },
          { key: 'Compatibility', value: 'iPhone, Android, Camera, PC' },
        ],
        isFeatured: false,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.7,
        numReviews: 29,
      },

      // ═══════════════════════════════════════════════════════════
      // CATEGORY 3: SMARTPHONES & TABLETS (5 Products)
      // ═══════════════════════════════════════════════════════════
      {
        name: 'Vortex Pro 5G Smartphone',
        slug: 'vortex-pro-5g-smartphone',
        description: 'Flagship smartphone powerhouse with 6.7" 120Hz FHD+ AMOLED display, Snapdragon 5G Octa-Core processor, 108MP studio camera with OIS, 5000mAh battery, and 67W Turbo Fast Charging (0-100% in 38 mins).',
        price: 28500,
        salePrice: 24990,
        purchasePrice: 21000,
        discountRate: 12,
        sku: 'TECH-PHONE-001',
        stock: 30,
        categories: [phonesCat._id],
        tags: ['Smartphone', '5G', 'AMOLED', '108MP Camera', 'FlashSale', 'Featured'],
        images: ['/assets/images/products/vortex_pro_smartphone.webp'],
        attributes: [
          { key: 'Display', value: '6.7" 120Hz AMOLED HDR10+' },
          { key: 'Camera', value: '108MP Primary (OIS) + 8MP Ultra + 2MP Macro' },
          { key: 'Memory', value: '8GB RAM + 256GB UFS 3.1' },
          { key: 'Battery & Charge', value: '5000mAh + 67W Turbo Charger' },
        ],
        isFeatured: true,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 45,
      },
      {
        name: 'Nova X1 Ultra Edition',
        slug: 'nova-x1-ultra-edition',
        description: 'Striking curved glass design smartphone featuring an ultra-slim 7.4mm profile, 64MP dual portrait cameras, 5G dual SIM support, 12GB virtual RAM extension, and immersive stereo speakers.',
        price: 21500,
        salePrice: 21500,
        purchasePrice: 17200,
        discountRate: 0,
        sku: 'TECH-PHONE-002',
        stock: 35,
        categories: [phonesCat._id],
        tags: ['Smartphone', '5G', 'Slim Design', 'New Arrival'],
        images: ['/assets/images/products/nova_x1_smartphone.webp'],
        attributes: [
          { key: 'Display', value: '6.67" 90Hz OLED Curved Screen' },
          { key: 'Storage', value: '8GB RAM + 128GB ROM' },
          { key: 'Main Camera', value: '64MP AI Night Vision' },
          { key: 'Battery', value: '4800mAh + 45W Fast Charging' },
        ],
        isFeatured: false,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.8,
        numReviews: 22,
      },
      {
        name: 'Titan Foldable 5G Smartphone',
        slug: 'titan-foldable-5g-smartphone',
        description: 'The pinnacle of mobile innovation. Unfolds from a sleek 6.2" outer screen into a magnificent 7.8" 120Hz flexible AMOLED tablet screen with aerospace grade hinge, multi-window multitasking, and 50MP triple Hasselblad optics.',
        price: 85000,
        salePrice: 85000,
        purchasePrice: 68000,
        discountRate: 0,
        sku: 'TECH-PHONE-003',
        stock: 12,
        categories: [phonesCat._id],
        tags: ['Foldable', 'Flagship', '5G Smartphone', 'New Arrival', 'Featured'],
        images: ['/assets/images/products/titan_5g_foldable.webp'],
        attributes: [
          { key: 'Screen', value: '7.8" Foldable AMOLED + 6.2" Cover' },
          { key: 'Chipset', value: 'Flagship 4nm 5G Processor' },
          { key: 'RAM & Storage', value: '12GB LPDDR5X + 512GB Storage' },
          { key: 'Charging', value: '80W Wired + 50W Wireless Fast Charge' },
        ],
        isFeatured: true,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 5.0,
        numReviews: 14,
      },
      {
        name: 'Apex Pad Pro 11-inch Tablet',
        slug: 'apex-pad-pro-11-inch-tablet',
        description: 'Versatile 11-inch 2K (2000x1200) IPS tablet engineered for productivity, digital drawing, and entertainment. Includes quad surround speakers, 4096-pressure level active stylus pen support, and 8200mAh battery.',
        price: 32000,
        salePrice: 27990,
        purchasePrice: 22500,
        discountRate: 13,
        sku: 'TECH-TAB-001',
        stock: 25,
        categories: [phonesCat._id],
        tags: ['Tablet', '2K Display', 'Stylus Support', 'Productivity', 'FlashSale'],
        images: ['/assets/images/products/apex_pad_pro.webp'],
        attributes: [
          { key: 'Display', value: '11" 2K Ultra-HD 120Hz IPS' },
          { key: 'Audio', value: 'Quad Dolby Atmos Speakers' },
          { key: 'Battery', value: '8200mAh (Up to 12H Video)' },
          { key: 'Performance', value: 'Octa-Core 8GB + 256GB' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.8,
        numReviews: 19,
      },
      {
        name: 'Aura Tab Lite 10.1',
        slug: 'aura-tab-lite-10-1',
        description: 'Family-friendly 10.1-inch HD tablet featuring dual stereo speakers, certified TUV low blue-light eye protection mode, parental control kid-space, lightweight aluminum frame, and reliable all-day battery.',
        price: 15500,
        salePrice: 15500,
        purchasePrice: 11800,
        discountRate: 0,
        sku: 'TECH-TAB-002',
        stock: 40,
        categories: [phonesCat._id],
        tags: ['Tablet', 'Budget Tablet', 'Kids Learning', 'Entertainment'],
        images: ['/assets/images/products/aura_lite_tablet.webp'],
        attributes: [
          { key: 'Display', value: '10.1" Eye-Care HD IPS' },
          { key: 'Memory', value: '4GB RAM + 64GB ROM (Expandable 512GB)' },
          { key: 'Battery', value: '6000mAh' },
          { key: 'OS', value: 'Clean Android 14' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.6,
        numReviews: 28,
      },

      // ═══════════════════════════════════════════════════════════
      // CATEGORY 4: TRENDY FASHION WEAR (5 Products)
      // ═══════════════════════════════════════════════════════════
      {
        name: 'Urban Aesthetic Oversized Hoodie',
        slug: 'urban-aesthetic-oversized-hoodie',
        description: 'Heavyweight 380 GSM combed organic cotton fleece hoodie tailored with relaxed drop-shoulder cut, double-layered hood, kangaroo pocket, ribbed cuffs, and minimalist streetwear tech-aesthetic silhouette.',
        price: 2200,
        salePrice: 1750,
        purchasePrice: 1100,
        discountRate: 20,
        sku: 'WEAR-HOODIE-001',
        stock: 80,
        categories: [wearCat._id],
        tags: ['Hoodie', 'Streetwear', 'Oversized', 'Cotton Fleece', 'FlashSale', 'Featured'],
        images: ['/assets/images/products/urban_oversized_hoodie.webp'],
        attributes: [
          { key: 'Fabric', value: '380 GSM 100% Combed Cotton' },
          { key: 'Fit', value: 'Relaxed Oversized Drop-Shoulder' },
          { key: 'Color', value: 'Charcoal Black / Slate' },
          { key: 'Care', value: 'Machine Wash Cold, Anti-Pilling' },
        ],
        isFeatured: true,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 62,
      },
      {
        name: 'Classic Vintage Denim Overcoat',
        slug: 'classic-vintage-denim-overcoat',
        description: 'Authentic 13.5oz washed denim jacket with reinforced copper hardware, double chest flap pockets, warm inner collar accents, and timeless vintage tailoring for versatile layering in every season.',
        price: 3400,
        salePrice: 3400,
        purchasePrice: 2100,
        discountRate: 0,
        sku: 'WEAR-JACKET-001',
        stock: 45,
        categories: [wearCat._id],
        tags: ['Denim Jacket', 'Vintage Outerwear', 'Street Style', 'New Arrival'],
        images: ['/assets/images/products/classic_denim_overcoat.webp'],
        attributes: [
          { key: 'Fabric', value: '13.5oz Ring-Spun Cotton Denim' },
          { key: 'Fit', value: 'Regular Contemporary Fit' },
          { key: 'Hardware', value: 'Anti-Rust Brass Buttons' },
          { key: 'Pockets', value: '4 Functional Pockets' },
        ],
        isFeatured: false,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.8,
        numReviews: 33,
      },
      {
        name: 'Active Dry-Fit Tech Jogger',
        slug: 'active-dry-fit-tech-jogger',
        description: 'High-performance 4-way stretch tech fleece jogger pants. Designed with ergonomic knee paneling, concealed waterproof zip pockets, adjustable drawstring waistband, and tapered ankle cuffs.',
        price: 1600,
        salePrice: 1290,
        purchasePrice: 850,
        discountRate: 19,
        sku: 'WEAR-JOGGER-001',
        stock: 90,
        categories: [wearCat._id],
        tags: ['Jogger', 'Dry-Fit', 'Tech Fleece', 'Activewear', 'FlashSale'],
        images: ['/assets/images/products/active_dry_fit_jogger.webp'],
        attributes: [
          { key: 'Material', value: 'Polyester-Elastane Tech Weave' },
          { key: 'Features', value: 'Sweat-Wicking & Anti-Odor' },
          { key: 'Pockets', value: 'Concealed YKK Zippered Pockets' },
          { key: 'Style', value: 'Athleisure Tapered Slim' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.7,
        numReviews: 48,
      },
      {
        name: 'Minimalist Premium Linen Shirt',
        slug: 'minimalist-premium-linen-shirt',
        description: 'Crafted from 100% natural European flax linen. Features an elegant mandarin band collar, pearlized button placket, breathable lightweight texture, and relaxed modern aesthetic for smart-casual wear.',
        price: 1950,
        salePrice: 1950,
        purchasePrice: 1200,
        discountRate: 0,
        sku: 'WEAR-SHIRT-001',
        stock: 60,
        categories: [wearCat._id],
        tags: ['Linen Shirt', 'Mandarin Collar', 'Minimalist Fashion', 'New Arrival'],
        images: ['/assets/images/products/minimalist_linen_shirt.webp'],
        attributes: [
          { key: 'Fabric', value: '100% Pure Organic Linen' },
          { key: 'Collar', value: 'Mandarin / Grandad Collar' },
          { key: 'Breathability', value: 'Ultra High Airflow' },
          { key: 'Occasion', value: 'Casual & Semi-Formal' },
        ],
        isFeatured: false,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.8,
        numReviews: 26,
      },
      {
        name: 'Nomad Waterproof Streetwear Windbreaker',
        slug: 'nomad-waterproof-streetwear-windbreaker',
        description: 'Urban technical windbreaker crafted from waterproof ripstop nylon with taped seams, high-visibility reflective tech graphics, breathable underarm eyelets, and packable hood design.',
        price: 2800,
        salePrice: 2800,
        purchasePrice: 1800,
        discountRate: 0,
        sku: 'WEAR-WINDBREAKER-001',
        stock: 35,
        categories: [wearCat._id],
        tags: ['Windbreaker', 'Waterproof', 'Techwear', 'Streetwear Jacket'],
        images: ['/assets/images/products/nomad_streetwear_jacket.webp'],
        attributes: [
          { key: 'Material', value: 'DWR Coated Ripstop Nylon' },
          { key: 'Weatherproof', value: '10,000mm Waterproof Rating' },
          { key: 'Details', value: 'Reflective Accents & Adjustable Cords' },
          { key: 'Weight', value: 'Lightweight & Foldable' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.7,
        numReviews: 19,
      },

      // ═══════════════════════════════════════════════════════════
      // CATEGORY 5: FASHION ACCESSORIES (5 Products)
      // ═══════════════════════════════════════════════════════════
      {
        name: 'Elegance Chronograph Classic Watch',
        slug: 'elegance-chronograph-classic-watch',
        description: 'Sophisticated analog timepiece with precision Japanese quartz movement, genuine scratch-resistant sapphire crystal glass, 3 functional sub-dials, stainless steel mesh band, and 50M water resistance.',
        price: 4500,
        salePrice: 3600,
        purchasePrice: 2500,
        discountRate: 20,
        sku: 'ACCESSORY-WATCH-001',
        stock: 50,
        categories: [accessoriesCat._id],
        tags: ['Watch', 'Chronograph', 'Luxury Watch', 'Analog', 'FlashSale', 'Featured'],
        images: ['/assets/images/products/chronograph_premium_watch.webp'],
        attributes: [
          { key: 'Glass', value: 'Scratch-Proof Sapphire Crystal' },
          { key: 'Movement', value: 'Japanese Quartz Chronograph' },
          { key: 'Band', value: '316L Stainless Steel Milanese Mesh' },
          { key: 'Water Resistance', value: '50M / 5ATM' },
        ],
        isFeatured: true,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 44,
      },
      {
        name: 'Aviator Polarized Classic Sunglasses',
        slug: 'aviator-polarized-classic-sunglasses',
        description: 'Iconic teardrop aviator sunglasses featuring TAC polarized UV400 protective lenses, anti-glare coating, featherweight alloy frame with silicone nose pads, and protective leatherette carrying case.',
        price: 1850,
        salePrice: 1850,
        purchasePrice: 950,
        discountRate: 0,
        sku: 'ACCESSORY-SUNGLASS-001',
        stock: 70,
        categories: [accessoriesCat._id],
        tags: ['Sunglasses', 'Aviator', 'Polarized', 'UV400', 'New Arrival', 'Featured'],
        images: ['/assets/images/products/aviator_classic_sunglasses.webp'],
        attributes: [
          { key: 'Lens', value: 'HD Polarized TAC with UV400' },
          { key: 'Frame', value: 'Lightweight Corrosion-Resistant Alloy' },
          { key: 'Protection', value: '100% UVA / UVB Protection' },
          { key: 'Includes', value: 'Hard Case & Microfiber Cloth' },
        ],
        isFeatured: true,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.8,
        numReviews: 37,
      },
      {
        name: 'Heritage Vintage Bifold Leather Wallet',
        slug: 'heritage-vintage-bifold-leather-wallet',
        description: 'Handcrafted from 100% full-grain crazy horse cowhide leather that develops a rich vintage patina over time. Features RFID blocking security shield, 8 card slots, dual cash compartments, and quick ID window.',
        price: 1800,
        salePrice: 1390,
        purchasePrice: 850,
        discountRate: 23,
        sku: 'ACCESSORY-WALLET-001',
        stock: 65,
        categories: [accessoriesCat._id],
        tags: ['Wallet', 'Genuine Leather', 'RFID Protected', 'Bifold', 'FlashSale'],
        images: ['/assets/images/products/vintage_leather_wallet.webp'],
        attributes: [
          { key: 'Leather', value: '100% Full-Grain Vegetable Tanned' },
          { key: 'Security', value: 'Built-in RFID Signal Blocking' },
          { key: 'Capacity', value: '8 Cards + 2 Currency Slots + ID' },
          { key: 'Finish', value: 'Vintage Hand-Burnished Edges' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: true,
        isPublished: true,
        ratings: 4.9,
        numReviews: 56,
      },
      {
        name: 'Artisan Classic Leather Pin-Buckle Belt',
        slug: 'artisan-classic-leather-pin-buckle-belt',
        description: 'Heavy-duty 1.5-inch wide full-grain leather belt crafted from a single solid strip of premium leather. Fitted with a solid matte gunmetal pin buckle and precision edge bevelling for lifelong durability.',
        price: 1500,
        salePrice: 1500,
        purchasePrice: 900,
        discountRate: 0,
        sku: 'ACCESSORY-BELT-001',
        stock: 55,
        categories: [accessoriesCat._id],
        tags: ['Belt', 'Genuine Leather', 'Full-Grain', 'Men Accessories'],
        images: ['/assets/images/products/classic_leather_belt.webp'],
        attributes: [
          { key: 'Material', value: '100% Solid Full-Grain Cowhide' },
          { key: 'Buckle', value: 'Heavy Duty Matte Gunmetal Zinc Alloy' },
          { key: 'Width', value: '38mm (1.5 inch)' },
          { key: 'Sizes', value: '32 to 44 Inches Waist' },
        ],
        isFeatured: false,
        isNewArrival: false,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.8,
        numReviews: 25,
      },
      {
        name: 'Urban Explorer Tech Backpack',
        slug: 'urban-explorer-tech-backpack',
        description: 'Modern 25L water-repellent minimalist backpack featuring 15.6-inch padded laptop compartment, integrated external USB charging port, hidden anti-theft passport pocket, and breathable ergonomic back cushioning.',
        price: 3200,
        salePrice: 3200,
        purchasePrice: 1950,
        discountRate: 0,
        sku: 'ACCESSORY-BAG-001',
        stock: 40,
        categories: [accessoriesCat._id],
        tags: ['Backpack', 'Laptop Bag', 'Water-Repellent', 'USB Port', 'New Arrival'],
        images: ['/assets/images/products/urban_explorer_backpack.webp'],
        attributes: [
          { key: 'Capacity', value: '25 Liters Multi-Pocket' },
          { key: 'Laptop Fit', value: 'Up to 15.6" Padded Sleeve' },
          { key: 'Fabric', value: 'Waterproof 900D Oxford Fabric' },
          { key: 'Tech Features', value: 'USB Charging Pass-Through + Luggage Strap' },
        ],
        isFeatured: false,
        isNewArrival: true,
        isFlashSale: false,
        isPublished: true,
        ratings: 4.9,
        numReviews: 39,
      },
    ];

    // Clear old products
    const deleteResult = await Product.deleteMany({});
    console.log(`🧹 Cleared ${deleteResult.deletedCount} existing products.`);

    // Insert new products
    const insertResult = await Product.insertMany(productsData);
    console.log(`🎉 Seeded ${insertResult.length} products successfully!`);

    // Verify counts
    const flashSaleCount = await Product.countDocuments({ isFlashSale: true });
    const newArrivalCount = await Product.countDocuments({ isNewArrival: true });
    const featuredCount = await Product.countDocuments({ isFeatured: true });
    const discountedCount = await Product.countDocuments({ discountRate: { $gt: 0 } });

    console.log('\n📊 SEEDING SUMMARY:');
    console.log(`- Total Products: ${insertResult.length}`);
    console.log(`- Flash Sale (⚡): ${flashSaleCount}`);
    console.log(`- New Arrivals (✨): ${newArrivalCount}`);
    console.log(`- Featured (⭐): ${featuredCount}`);
    console.log(`- Discounted (%): ${discountedCount}`);

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

seedProducts();
