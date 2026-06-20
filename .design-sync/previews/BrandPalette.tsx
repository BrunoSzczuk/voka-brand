import { BrandPalette } from 'voka-brand-kit';

export const Horizontal = () => <BrandPalette orientation="horizontal" size={160} />;

export const Tall = () => <BrandPalette orientation="horizontal" size={240} />;

export const Vertical = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <BrandPalette orientation="vertical" size={60} />
  </div>
);

export const NoLabels = () => <BrandPalette orientation="horizontal" showLabels={false} size={80} />;
