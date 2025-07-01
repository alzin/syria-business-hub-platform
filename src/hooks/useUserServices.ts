
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserService, ServiceFormData } from '@/types/services';
import { toast } from '@/hooks/use-toast';

export const useUserServices = () => {
  const [services, setServices] = useState<UserService[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserServices = useCallback(async (userId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_services')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const userServices: UserService[] = data?.map(service => ({
        id: service.id,
        userId: service.user_id,
        expertiseCategory: service.expertise_category,
        expertiseSpecialization: service.expertise_specialization,
        serviceTitle: service.service_title,
        serviceDescription: service.service_description,
        pricingType: service.pricing_type,
        priceRange: service.price_range,
        availabilityStatus: service.availability_status,
        deliveryTime: service.delivery_time,
        requirements: service.requirements,
        portfolioLinks: service.portfolio_links || [],
        isActive: service.is_active,
        createdAt: new Date(service.created_at),
        updatedAt: new Date(service.updated_at),
      })) || [];

      setServices(userServices);
    } catch (error: any) {
      console.error('Error fetching user services:', error);
      toast({
        title: "Failed to load services",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createService = useCallback(async (serviceData: ServiceFormData, userId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_services')
        .insert({
          user_id: userId,
          service_title: serviceData.serviceTitle,
          service_description: serviceData.serviceDescription,
          expertise_category: serviceData.expertiseCategory,
          expertise_specialization: serviceData.expertiseSpecialization,
          pricing_type: serviceData.pricingType,
          price_range: serviceData.priceRange,
          availability_status: serviceData.availabilityStatus,
          delivery_time: serviceData.deliveryTime,
          requirements: serviceData.requirements,
          portfolio_links: serviceData.portfolioLinks,
        });

      if (error) throw error;

      toast({
        title: "Service created",
        description: "Your service has been added successfully.",
      });

      // Refresh services list
      await fetchUserServices(userId);
    } catch (error: any) {
      console.error('Error creating service:', error);
      toast({
        title: "Failed to create service",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserServices]);

  const updateService = useCallback(async (serviceId: string, serviceData: Partial<ServiceFormData>, userId: string) => {
    setIsLoading(true);
    try {
      const updateData: any = {};
      if (serviceData.serviceTitle) updateData.service_title = serviceData.serviceTitle;
      if (serviceData.serviceDescription) updateData.service_description = serviceData.serviceDescription;
      if (serviceData.expertiseCategory) updateData.expertise_category = serviceData.expertiseCategory;
      if (serviceData.expertiseSpecialization) updateData.expertise_specialization = serviceData.expertiseSpecialization;
      if (serviceData.pricingType) updateData.pricing_type = serviceData.pricingType;
      if (serviceData.priceRange) updateData.price_range = serviceData.priceRange;
      if (serviceData.availabilityStatus) updateData.availability_status = serviceData.availabilityStatus;
      if (serviceData.deliveryTime) updateData.delivery_time = serviceData.deliveryTime;
      if (serviceData.requirements) updateData.requirements = serviceData.requirements;
      if (serviceData.portfolioLinks) updateData.portfolio_links = serviceData.portfolioLinks;

      const { error } = await supabase
        .from('user_services')
        .update(updateData)
        .eq('id', serviceId);

      if (error) throw error;

      toast({
        title: "Service updated",
        description: "Your service has been updated successfully.",
      });

      // Refresh services list
      await fetchUserServices(userId);
    } catch (error: any) {
      console.error('Error updating service:', error);
      toast({
        title: "Failed to update service",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserServices]);

  const deleteService = useCallback(async (serviceId: string, userId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_services')
        .delete()
        .eq('id', serviceId);

      if (error) throw error;

      toast({
        title: "Service deleted",
        description: "Your service has been removed successfully.",
      });

      // Refresh services list
      await fetchUserServices(userId);
    } catch (error: any) {
      console.error('Error deleting service:', error);
      toast({
        title: "Failed to delete service",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserServices]);

  const toggleServiceStatus = useCallback(async (serviceId: string, isActive: boolean, userId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_services')
        .update({ is_active: isActive })
        .eq('id', serviceId);

      if (error) throw error;

      toast({
        title: isActive ? "Service activated" : "Service deactivated",
        description: `Your service has been ${isActive ? 'activated' : 'deactivated'}.`,
      });

      // Refresh services list
      await fetchUserServices(userId);
    } catch (error: any) {
      console.error('Error toggling service status:', error);
      toast({
        title: "Failed to update service status",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [fetchUserServices]);

  return {
    services,
    isLoading,
    fetchUserServices,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
  };
};
