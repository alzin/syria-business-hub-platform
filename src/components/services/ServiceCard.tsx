
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Clock, DollarSign, ExternalLink, MoreVertical, Edit, Trash, Eye, EyeOff } from 'lucide-react';
import { UserService } from '@/types/services';

interface ServiceCardProps {
  service: UserService;
  isOwner?: boolean;
  onEdit?: (service: UserService) => void;
  onDelete?: (serviceId: string) => void;
  onToggleStatus?: (serviceId: string, isActive: boolean) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isOwner = false,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPricingTypeColor = (type: string) => {
    switch (type) {
      case 'hourly': return 'bg-blue-100 text-blue-800';
      case 'fixed': return 'bg-purple-100 text-purple-800';
      case 'negotiable': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`h-full ${!service.isActive ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 line-clamp-2">
              {service.serviceTitle}
              {!service.isActive && (
                <Badge variant="secondary" className="ml-2 text-xs">
                  Inactive
                </Badge>
              )}
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Badge className={getAvailabilityColor(service.availabilityStatus)}>
                {service.availabilityStatus}
              </Badge>
              {service.pricingType && (
                <Badge className={getPricingTypeColor(service.pricingType)}>
                  {service.pricingType}
                </Badge>
              )}
            </div>
          </div>
          
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit?.(service)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus?.(service.id, !service.isActive)}>
                  {service.isActive ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete?.(service.id)}
                  className="text-red-600"
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Service Description */}
        {service.serviceDescription && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {service.serviceDescription}
          </p>
        )}

        {/* Expertise */}
        {(service.expertiseCategory || service.expertiseSpecialization) && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Expertise</p>
            <div className="flex flex-wrap gap-1">
              {service.expertiseCategory && (
                <Badge variant="outline" className="text-xs">
                  {service.expertiseCategory}
                </Badge>
              )}
              {service.expertiseSpecialization && (
                <Badge variant="outline" className="text-xs">
                  {service.expertiseSpecialization}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Pricing and Delivery */}
        <div className="flex items-center justify-between text-sm">
          {service.priceRange && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-3 w-3" />
              <span>{service.priceRange}</span>
            </div>
          )}
          {service.deliveryTime && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{service.deliveryTime}</span>
            </div>
          )}
        </div>

        {/* Requirements */}
        {service.requirements && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Requirements</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {service.requirements}
            </p>
          </div>
        )}

        {/* Portfolio Links */}
        {service.portfolioLinks.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Portfolio</p>
            <div className="flex flex-wrap gap-1">
              {service.portfolioLinks.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                >
                  <ExternalLink className="h-3 w-3" />
                  Work {index + 1}
                </a>
              ))}
              {service.portfolioLinks.length > 2 && (
                <span className="text-xs text-muted-foreground">
                  +{service.portfolioLinks.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
