"use client";

import type { OrderStatus } from '@/types';
import { Hourglass, Settings2, Truck, PackageCheck, XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderStatusIconProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<OrderStatus, { icon: React.ElementType; color: string, label: string }> = {
  pending: { icon: Hourglass, color: 'text-yellow-500', label: 'Pending' },
  processing: { icon: Settings2, color: 'text-blue-500', label: 'Processing' },
  shipped: { icon: Truck, color: 'text-indigo-500', label: 'Shipped' },
  delivered: { icon: PackageCheck, color: 'text-green-500', label: 'Delivered' },
  cancelled: { icon: XCircle, color: 'text-red-500', label: 'Cancelled' },
};

export default function OrderStatusIcon({ status, className }: OrderStatusIconProps) {
  const config = statusConfig[status] || { icon: AlertCircle, color: 'text-gray-500', label: 'Unknown' };
  const IconComponent = config.icon;

  return (
    <div className={cn("flex items-center", config.color, className)}>
      <IconComponent className={cn("h-5 w-5 mr-2", status === 'processing' ? 'animate-spin' : '')} />
      <span className="font-medium capitalize">{config.label}</span>
    </div>
  );
}
