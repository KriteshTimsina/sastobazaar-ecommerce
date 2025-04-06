import React from 'react';
import { Badge, badgeVariants } from '../ui/badge';
import { VariantProps } from 'class-variance-authority';

type Status = 'In Stock' | 'Low Stock' | 'Out of Stock';

type AvailabilityStatus = {
  status: Status;
  variant: VariantProps<typeof badgeVariants>['variant'];
};

// Clean function to determine stock status based on quantity
const getAvailabilityStatus = (quantity: number): AvailabilityStatus => {
  if (quantity === 0) {
    return {
      status: 'Out of Stock',
      variant: 'destructive',
    };
  }

  if (quantity < 10) {
    return {
      status: 'Low Stock',
      variant: 'yellow',
    };
  }

  return {
    status: 'In Stock',
    variant: 'outline',
  };
};

interface StockAvailabilityStatusProps {
  quantity: number;
}

const StockAvailabilityStatus: React.FC<StockAvailabilityStatusProps> = ({ quantity }) => {
  const { status, variant } = getAvailabilityStatus(quantity);

  return <Badge variant={variant}>{status}</Badge>;
};

export default StockAvailabilityStatus;
