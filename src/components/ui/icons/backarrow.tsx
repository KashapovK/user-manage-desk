import React from 'react';
import BackArrowSvg from '@/assets/icons/backarrow.svg?react';

export interface BackArrowIconProps extends React.SVGProps<SVGSVGElement> {}

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({ ...props }) => {
  return <BackArrowSvg {...props} />;
};
