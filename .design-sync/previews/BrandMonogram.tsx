import { BrandMonogram } from 'voka-brand-kit';

export const Dark = () => <BrandMonogram variant="dark" size={100} />;

export const Light = () => (
  <div style={{ padding: 16, background: '#2d2926', borderRadius: 16, display: 'inline-block' }}>
    <BrandMonogram variant="light" size={100} />
  </div>
);

export const Charcoal = () => <BrandMonogram variant="charcoal" size={100} />;

export const Circle = () => <BrandMonogram variant="circle" size={100} />;

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: 16, padding: 24, background: '#f5f0eb', borderRadius: 16 }}>
    {(['dark', 'light', 'charcoal', 'circle'] as const).map(v => (
      <BrandMonogram key={v} variant={v} size={72} />
    ))}
  </div>
);

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 24, background: '#0a0a0a', borderRadius: 16 }}>
    {[32, 48, 64, 80, 100].map(s => (
      <BrandMonogram key={s} variant="dark" size={s} />
    ))}
  </div>
);
