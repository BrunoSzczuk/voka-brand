import { BrandTypography } from 'voka-brand-kit';

export const Default = () => <BrandTypography />;

export const CustomText = () => (
  <BrandTypography sampleText="Algodão pesado. Corte limpo." />
);

export const DarkBackground = () => (
  <BrandTypography background="#0a0a0a" />
);
