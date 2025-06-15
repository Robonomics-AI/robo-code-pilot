
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VendorState } from '@/pages/settings/AIModelConfiguration';

interface VendorCardProps {
  vendor: VendorState;
  onManage: () => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onManage }) => {
  const { name, logo: Logo, connected } = vendor;

  return (
    <Card className="border border-[#444444] hover:border-[var(--color-accent-cyan)] transition-colors duration-200">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium text-white">{name}</CardTitle>
        <Logo className="h-6 w-6 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
            <Badge variant={connected ? "default" : "secondary"} className={connected ? "bg-[var(--color-accent-green)] hover:bg-[var(--color-accent-green)]" : "bg-gray-600 text-gray-300"}>
              {connected ? 'Connected' : 'Not Connected'}
            </Badge>
          <Button variant="secondary" size="sm" onClick={onManage}>
            {connected ? 'Manage' : 'Configure'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
