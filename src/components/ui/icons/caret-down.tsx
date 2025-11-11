import React from 'react';
import CaretDownSvg from '@/assets/icons/caret-down.svg?react';

export interface CaretDownIconProps extends React.SVGProps<SVGSVGElement> {}

export const CaretDownIcon: React.FC<CaretDownIconProps> = ({ ...props }) => {
  return <CaretDownSvg {...props} />;
};
