import { BrandLogo } from 'voka-brand-kit';

export const PrimaryDark = () => <BrandLogo variant="primary-dark" size="lg" />;

export const PrimaryLight = () => <BrandLogo variant="primary-light" size="lg" />;

export const Bold = () => <BrandLogo variant="bold" size="lg" />;

export const Lowercase = () => <BrandLogo variant="lowercase" size="lg" />;

export const Stone = () => <BrandLogo variant="stone" size="lg" />;

export const SubBrand = () => <BrandLogo variant="sub-brand" size="lg" />;

export const Registered = () => <BrandLogo variant="registered" size="lg" />;

export const AllSizes = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, background: '#0a0a0a', borderRadius: 12 }}>
    {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
      <BrandLogo key={s} variant="primary-dark" size={s} showCard={false} />
    ))}
  </div>
);
