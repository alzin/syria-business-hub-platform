
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { ServiceFormData, UserService } from '@/types/services';
import { EXPERTISE_OPTIONS } from '@/types';
import TwoStepExpertiseSelector from '@/components/ui/two-step-expertise-selector';

interface ServiceFormProps {
  service?: UserService;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onSubmit,
  onCancel,
  isLoading
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ServiceFormData>({
    serviceTitle: service?.serviceTitle || '',
    serviceDescription: service?.serviceDescription || '',
    expertiseCategory: service?.expertiseCategory || '',
    expertiseSpecialization: service?.expertiseSpecialization || '',
    pricingType: service?.pricingType || 'negotiable',
    priceRange: service?.priceRange || '',
    availabilityStatus: service?.availabilityStatus || 'available',
    deliveryTime: service?.deliveryTime || '',
    requirements: service?.requirements || '',
    portfolioLinks: service?.portfolioLinks || [],
  });
  const [newPortfolioLink, setNewPortfolioLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const addPortfolioLink = () => {
    if (newPortfolioLink.trim()) {
      setFormData(prev => ({
        ...prev,
        portfolioLinks: [...prev.portfolioLinks, newPortfolioLink.trim()]
      }));
      setNewPortfolioLink('');
    }
  };

  const removePortfolioLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index)
    }));
  };

  const handleExpertiseChange = (category: string, specialization: string) => {
    setFormData(prev => ({
      ...prev,
      expertiseCategory: category,
      expertiseSpecialization: specialization
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {service ? 'Edit Service' : 'Create New Service'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Title */}
          <div className="space-y-2">
            <Label htmlFor="serviceTitle">Service Title *</Label>
            <Input
              id="serviceTitle"
              placeholder="e.g., Professional Logo Design"
              value={formData.serviceTitle}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceTitle: e.target.value }))}
              required
              disabled={isLoading}
            />
          </div>

          {/* Service Description */}
          <div className="space-y-2">
            <Label htmlFor="serviceDescription">Service Description</Label>
            <Textarea
              id="serviceDescription"
              placeholder="Describe what you offer, your approach, and what makes your service unique..."
              value={formData.serviceDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, serviceDescription: e.target.value }))}
              rows={4}
              disabled={isLoading}
            />
          </div>

          {/* Expertise Category & Specialization */}
          <div className="space-y-2">
            <Label>Expertise Category & Specialization</Label>
            <TwoStepExpertiseSelector
              category={formData.expertiseCategory}
              specialization={formData.expertiseSpecialization}
              onCategoryChange={(category) => handleExpertiseChange(category, formData.expertiseSpecialization)}
              onSpecializationChange={(specialization) => handleExpertiseChange(formData.expertiseCategory, specialization)}
              disabled={isLoading}
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pricingType">Pricing Type</Label>
              <Select
                value={formData.pricingType}
                onValueChange={(value: 'hourly' | 'fixed' | 'negotiable') => 
                  setFormData(prev => ({ ...prev, pricingType: value }))
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="negotiable">Negotiable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range</Label>
              <Input
                id="priceRange"
                placeholder="e.g., $50-100/hr or $500 fixed"
                value={formData.priceRange}
                onChange={(e) => setFormData(prev => ({ ...prev, priceRange: e.target.value }))}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Availability & Delivery Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="availabilityStatus">Availability</Label>
              <Select
                value={formData.availabilityStatus}
                onValueChange={(value: 'available' | 'busy' | 'unavailable') => 
                  setFormData(prev => ({ ...prev, availabilityStatus: value }))
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Input
                id="deliveryTime"
                placeholder="e.g., 3-5 business days"
                value={formData.deliveryTime}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryTime: e.target.value }))}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements from Client</Label>
            <Textarea
              id="requirements"
              placeholder="What do you need from clients to get started? (e.g., brand guidelines, content, specific requirements...)"
              value={formData.requirements}
              onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
              rows={3}
              disabled={isLoading}
            />
          </div>

          {/* Portfolio Links */}
          <div className="space-y-2">
            <Label>Portfolio Links</Label>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/my-work"
                value={newPortfolioLink}
                onChange={(e) => setNewPortfolioLink(e.target.value)}
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addPortfolioLink}
                disabled={isLoading}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.portfolioLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.portfolioLinks.map((link, index) => (
                  <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1">
                    <span className="max-w-[200px] truncate">{link}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 ml-1"
                      onClick={() => removePortfolioLink(index)}
                      disabled={isLoading}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? 'Saving...' : (service ? 'Update Service' : 'Create Service')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
