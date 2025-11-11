import React from 'react';
import DropdownSvg from '@/assets/icons/dropdown.svg?react';

export interface DropdownIconProps extends React.SVGProps<SVGSVGElement> {}

export const DropdownIcon: React.FC<DropdownIconProps> = ({ ...props }) => {
  return <DropdownSvg {...props} />;
};
