'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Headphones,
  Watch,
  BatteryCharging,
  Smartphone,
  Flame,
  Truck,
  ArrowRight,
  Building2,
  Users,
  Eye,
  Target,
  Star,
  Layers,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutClient({ settings }: { settings: any }) {
  const { t } = useLanguage();
  const brandName = settings?.brandName || process.env.NEXT_PUBLIC_STORE_NAME || 'Store';

  const gadgetCategories = [
    {
      icon: Watch,
      name: t('about.gadgets.wearables.name') as string || 'Smart Wearables & Watches',
      desc: t('about.gadgets.wearables.desc') as string || 'AMOLED smartwatches, fitness trackers, smart rings, and designer luxury replacement straps.',
      tag: t('about.gadgets.wearables.tag') as string || 'Top Trending',
    },
    {
      icon: Headphones,
      name: t('about.gadgets.audio.name') as string || 'True Wireless & Hi-Fi Audio',
      desc: t('about.gadgets.audio.desc') as string || 'Active Noise Cancelling (ANC) earbuds, studio over-ear headphones, Bluetooth speakers, and IEMs.',
      tag: t('about.gadgets.audio.tag') as string || 'High Fidelity',
    },
    {
      icon: BatteryCharging,
      name: t('about.gadgets.charging.name') as string || 'Fast Charging & Power Tech',
      desc: t('about.gadgets.charging.desc') as string || 'Next-gen GaN chargers, MagSafe wireless power banks, 240W PD cables, and desktop charging stations.',
      tag: t('about.gadgets.charging.tag') as string || 'Next-Gen GaN',
    },
    {
      icon: Smartphone,
      name: t('about.gadgets.accessories.name') as string || 'Mobile & Camera Gear',
      desc: t('about.gadgets.accessories.desc') as string || 'Magnetic cases, camera lens protectors, mobile gimbals, desktop phone stands, and gaming triggers.',
      tag: t('about.gadgets.accessories.tag') as string || 'Essential Gear',
    },
    {
      icon: Zap,
      name: t('about.gadgets.lifestyle.name') as string || 'Smart Living & Desk Tech',
      desc: t('about.gadgets.lifestyle.desc') as string || 'RGB ambient smart lights, ergonomic desk accessories, mini cooling fans, and smart home essentials.',
      tag: t('about.gadgets.lifestyle.tag') as string || 'Modern Setup',
    },
    {
      icon: Layers,
      name: t('about.gadgets.fashion.name') as string || 'Fashion Tech & EDC Gear',
      desc: t('about.gadgets.fashion.desc') as string || 'Waterproof tech organizer bags, aesthetic gadget pouches, minimalist backpacks, and everyday carry gear.',
      tag: t('about.gadgets.fashion.tag') as string || 'Lifestyle Style',
    },
  ];

  const coreValues = [
    {
      icon: ShieldCheck,
      title: t('about.values.authenticity.title') as string || '100% Genuine & Authentic',
      desc: t('about.values.authenticity.desc') as string || 'Every gadget and accessory in our collection is authentic, sourced directly from certified brands and authorized distributors with official warranty.',
    },
    {
      icon: Sparkles,
      title: t('about.values.aesthetic.title') as string || 'Fashion Meets Innovation',
      desc: t('about.values.aesthetic.desc') as string || 'We handpick tech that doesn’t just perform flawlessly but also complements your personal aesthetic, wardrobe, and modern digital lifestyle.',
    },
    {
      icon: Truck,
      title: t('about.values.delivery.title') as string || 'Fast Nationwide Delivery',
      desc: t('about.values.delivery.desc') as string || 'Swift express delivery inside Dhaka and reliable courier service across all 64 districts in Bangladesh with safe packaging and tracking.',
    },
  ];

  const highlights = [
    {
      icon: CheckCircle2,
      title: t('about.highlights.warranty.title') as string || 'Official Brand Warranty',
      desc: t('about.highlights.warranty.desc') as string || 'Hassle-free official warranty coverage on all eligible electronics and smart devices.',
    },
    {
      icon: RotateCcw,
      title: t('about.highlights.return.title') as string || 'Easy Replacement Policy',
      desc: t('about.highlights.return.desc') as string || 'Customer-friendly replacement support in case of any manufacturing defects.',
    },
    {
      icon: Flame,
      title: t('about.highlights.trendy.title') as string || 'Latest Tech Drops',
      desc: t('about.highlights.trendy.desc') as string || 'First access to globally trending gadgets, smart wearables, and viral tech accessories.',
    },
    {
      icon: Users,
      title: t('about.highlights.support.title') as string || 'Expert Tech Support',
      desc: t('about.highlights.support.desc') as string || 'Dedicated support team ready to assist with product guidance, specs, and setup tips.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-transparent py-20 md:py-32 border-b border-primary/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary mb-4">
            <Sparkles className="h-3 w-3" /> {t('about.hero.badge') as string || "Bangladesh's Premier Electronic Gadgets & Fashion Destination"}
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-6">
            {t('about.hero.title_start') as string || 'About'} <span className="text-primary">{brandName}</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {t('about.hero.desc_start') as string || 'Where cutting-edge technology meets modern lifestyle and aesthetics — '}{' '}
            <strong className="text-primary">{brandName}</strong> {t('about.hero.desc_end') as string || 'brings you authentic smart wearables, premium audio gear, high-speed power accessories, and trendsetting fashion tech across Bangladesh.'}
          </p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 bg-card/30 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '100%', label: t('about.stats.authentic') as string || 'Authentic & Original Products' },
              { value: '50K+', label: t('about.stats.customers') as string || 'Satisfied Tech Lovers' },
              { value: '64', label: t('about.stats.districts') as string || 'Districts Nationwide Delivery' },
              { value: '24/7', label: t('about.stats.support') as string || 'Customer & Warranty Support' },
            ].map((s) => (
              <div key={s.label} className="p-4 space-y-1">
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story & Mission ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t('about.story.title1') as string || 'Tech Meets Aesthetics.'} <br />
                <span className="text-primary">{t('about.story.title2') as string || 'Innovation for Modern Lifestyle.'}</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                <strong>{brandName}</strong> {t('about.story.p1') as string || 'was created with a singular passion: to make world-class electronic gadgets and fashion-forward tech accessories easily accessible to every enthusiast in Bangladesh. We believe everyday gadgets should not only be high-performing, but should also elevate your daily style.'}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t('about.story.p2') as string || 'From high-definition ANC wireless earbuds and smartwatches to ultra-fast GaN chargers, MagSafe gear, and aesthetic EDC organizers — each item in our collection is strictly tested for authenticity, build quality, and peak performance.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t('about.mission.title') as string || 'Our Mission'}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t('about.mission.desc') as string || 'To deliver original, top-tier electronic gadgets and trendy tech lifestyle products at fair prices with dependable warranty and unmatched customer support.'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">{t('about.vision.title') as string || 'Our Vision'}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t('about.vision.desc') as string || 'To become Bangladesh’s most trusted electronic gadget & fashion tech destination, empowering millions to embrace the smart digital era in style.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote panel */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square max-w-md mx-auto w-full rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary-foreground/30 p-1 shadow-2xl">
              <div className="w-full h-full bg-slate-900 rounded-[22px] overflow-hidden relative flex flex-col justify-end p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10" />
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_10%,transparent_10.1%)] bg-[length:20px_20px]" />
                <div className="relative z-20 space-y-3">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-primary px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md self-start inline-block">
                    {t('about.promise.badge') as string || 'Our Promise'}
                  </span>
                  <blockquote className="text-lg md:text-xl font-bold leading-relaxed italic">
                    &quot;{t('about.promise.quote') as string || 'Smart tech should not just be functional — it should seamlessly express who you are and elevate your lifestyle every single day.'}&quot;
                  </blockquote>
                  <p className="text-xs text-slate-300 font-medium">— {t('about.promise.team') as string || 'The'} {brandName} {t('about.promise.team2') as string || 'Team'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-16 md:py-24 bg-primary/5 border-t border-b border-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">{t('about.values.title') as string || `Why Choose ${brandName}?`}</h2>
            <p className="text-muted-foreground text-sm">
              {t('about.values.desc') as string || `Three fundamental pillars that define our commitment to quality, authenticity, and design excellence.`}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="bg-background p-8 rounded-2xl border shadow-sm space-y-4 text-center flex flex-col items-center hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed max-w-[280px]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gadget Categories & Specialties ── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Zap className="h-3 w-3" /> {t('about.categories.badge') as string || 'Curated Product Lines'}
            </span>
            <h2 className="text-3xl font-bold tracking-tight">{t('about.categories.title') as string || 'What We Specialize In'}</h2>
            <p className="text-muted-foreground text-sm">
              {t('about.categories.desc') as string || 'From everyday smart essentials to premium audiophile gear and lifestyle tech accessories.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gadgetCategories.map((cat) => (
              <div
                key={cat.name}
                className="relative rounded-2xl border bg-card p-6 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    {cat.tag}
                  </span>
                </div>
                <h3 className="font-bold text-base text-foreground">{cat.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights & Benefits ── */}
      <section className="py-16 md:py-20 bg-muted/30 border-t border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
              <Star className="h-3 w-3" /> {t('about.highlights.badge') as string || 'Customer First'}
            </span>
            <h2 className="text-3xl font-bold tracking-tight">{t('about.highlights.title') as string || 'The Experience You Deserve'}</h2>
            <p className="text-muted-foreground text-sm">
              {t('about.highlights.desc') as string || 'Shopping with us guarantees peace of mind, prompt assistance, and authentic gadget reliability.'}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="bg-background rounded-2xl border p-6 space-y-3 hover:shadow-md hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <h.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-sm text-foreground leading-tight">{h.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showrooms & Fast Shipping ── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="rounded-2xl border bg-card p-8 space-y-4 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Truck className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">{t('about.shipping.title') as string || 'Nationwide Express Shipping'}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong>{brandName}</strong> {t('about.shipping.desc') as string || 'provides speedy home delivery across all 64 districts of Bangladesh with safe, bubble-wrapped packaging and online tracking.'}
              </p>
              <Link href="/shop" passHref>
                <Button variant="outline" size="sm" className="rounded-full mt-2">
                  {t('about.shipping.btn') as string || 'Start Shopping'}
                </Button>
              </Link>
            </div>
            <div className="rounded-2xl border bg-card p-8 space-y-4 text-center flex flex-col items-center hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold">{t('about.showrooms.title') as string || 'Showrooms & Support Hubs'}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('about.showrooms.desc') as string || 'Experience our gadgets in person or connect with our customer service team for product advice, warranty claims, and corporate inquiries.'}
              </p>
              <Link href="/contact" passHref>
                <Button variant="outline" size="sm" className="rounded-full mt-2">
                  {t('about.showrooms.btn') as string || 'Get in Touch'}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="py-12 bg-primary/5 border-t border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Zap, value: '500+', label: t('about.numbers.products') as string || 'Gadget Varieties' },
              { icon: Users, value: '50K+', label: t('about.numbers.orders') as string || 'Orders Delivered' },
              { icon: Building2, value: '64', label: t('about.numbers.districts') as string || 'Districts Reached' },
              { icon: Star, value: '99%', label: t('about.numbers.satisfaction') as string || 'Customer Satisfaction' },
            ].map((s) => (
              <div key={s.label} className="p-4 space-y-2 flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <p className="text-3xl md:text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technology Partner ── */}
      <section className="py-16 bg-gradient-to-b from-card to-background border-y border-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.15)_1px,transparent_1px)] bg-[length:16px_16px]" />
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase">
            <span>{t('about.tech.badge') as string || 'Technology Partner'}</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            {t('about.tech.title') as string || 'Crafted by Jia Pixel'}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {t('about.tech.desc_start') as string || 'This high-performance e-commerce platform is designed, built, and optimized by'}{' '}
            <a
              href="https://www.jiapixel.com"
              target="_blank"
              rel="noopener"
              className="text-primary font-semibold hover:underline transition-all"
            >
              Jia Pixel
            </a>
            , {t('about.tech.desc_mid') as string || 'the Leading Digital Agency In Bangladesh — engineering custom digital solutions for modern brands like'} <strong>{brandName}</strong>.
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            {t('about.cta.title_start') as string || 'Elevate Your'} <span className="text-primary">{t('about.cta.title_end') as string || 'Tech Lifestyle'}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            {t('about.cta.desc') as string || 'Explore our collection of authentic smart gadgets, audio gear, and fashion tech accessories.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/shop" passHref>
              <Button
                size="lg"
                className="rounded-full px-8 py-6 font-black uppercase text-sm tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {t('about.cta.browse') as string || 'Explore Gadgets'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 font-bold text-sm transition-all hover:bg-muted/50"
              >
                {t('about.cta.contact') as string || 'Contact Us'}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
