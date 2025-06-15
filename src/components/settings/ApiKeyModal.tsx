
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VendorState, VendorId } from '@/pages/settings/AIModelConfiguration';
import { Eye, EyeOff, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: VendorState;
  onSave: (vendorId: VendorId, apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, vendor, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  if (!vendor) return null;

  const handleTestConnection = () => {
    if (!apiKey) {
      toast.error("Please enter an API key.");
      return;
    }
    setIsTesting(true);
    // Simulate API call
    setTimeout(() => {
      setIsTesting(false);
      // Simulate random success/failure
      if (Math.random() > 0.2) {
        toast.success("Connection successful!");
      } else {
        toast.error("Connection failed, please check your key.");
      }
    }, 1500);
  };

  const handleSave = () => {
     if (!apiKey) {
      toast.error("Please enter an API key to save.");
      return;
    }
    onSave(vendor.id as VendorId, apiKey);
    setApiKey('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#2C2C2C] border-[#444444] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <vendor.logo className="h-7 w-7 text-[var(--color-accent-cyan)]" />
            Connect to {vendor.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            To connect RoboCode to {vendor.name}, you need an API Key. You can get your key from your {vendor.name} platform account settings.
            <a href={vendor.docsUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent-cyan)] hover:underline ml-2 inline-flex items-center gap-1">
                Go to {vendor.name} Docs <ExternalLink className="h-3 w-3" />
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
              >
                {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="outline" onClick={handleTestConnection} disabled={isTesting}>
            {isTesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Test Connection
          </Button>
          <Button onClick={handleSave}>Save Configuration</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
