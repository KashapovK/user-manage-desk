import React from 'react';
import NotificationSvg from '@/assets/icons/notification.svg?react';

export interface NotificationIconProps extends React.SVGProps<SVGSVGElement> {}

export const NotificationIcon: React.FC<NotificationIconProps> = ({
  ...props
}) => {
  return <NotificationSvg {...props} />;
};
