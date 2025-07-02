
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, DollarSign, ExternalLink, MapPin, CheckCircle } from 'lucide-react';
import { UserService } from '@/types/services';

interface UserPublicServicesProps {
  services: UserService[];
  userName: string;
}

const UserPublicServices: React.FC<UserPublicServicesProps> = ({
  services,
  userName
}) => {
  const getPricingTypeColor = (type: string) => {
    switch (type) {
      case 'hourly': return 'bg-blue-100 text-blue-800';
      case 'fixed': return 'bg-purple-100 text-purple-800';
      case 'negotiable': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Available Services by {userName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => (
            <Card key={service.id} className="border border-green-200 bg-green-50/30">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 line-clamp-2">
                      {service.serviceTitle}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        Available
                      </Badge>
                      {service.pricingType && (
                        <Badge className={getPricingTypeColor(service.pricingType)}>
                          {service.pricingType}
                        </Badge>
                      )}
                    </div>
                  </div>
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
                      {service.portfolioLinks.slice(0, 3).map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Work {index + 1}
                        </a>
                      ))}
                      {service.portfolioLinks.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{service.portfolioLinks.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact CTA */}
                <div className="pt-2 border-t border-green-200">
                  <p className="text-xs text-green-700 font-medium">
                    💬 Contact {userName} to discuss this service
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserPublicServices;
