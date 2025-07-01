
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Briefcase } from 'lucide-react';
import { useUserServices } from '@/hooks/useUserServices';
import { UserService, ServiceFormData } from '@/types/services';
import ServiceForm from './ServiceForm';
import ServiceCard from './ServiceCard';

interface ServicesManagerProps {
  userId: string;
  isOwner?: boolean;
}

const ServicesManager: React.FC<ServicesManagerProps> = ({ userId, isOwner = false }) => {
  const { user } = useAuth();
  const {
    services,
    isLoading,
    fetchUserServices,
    createService,
    updateService,
    deleteService,
    toggleServiceStatus,
  } = useUserServices();

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<UserService | null>(null);
  const [deletingServiceId, setDeletingServiceId] = useState<string | null>(null);

  useEffect(() => {
    fetchUserServices(userId);
  }, [fetchUserServices, userId]);

  const handleCreateService = async (data: ServiceFormData) => {
    await createService(data, userId);
    setShowForm(false);
  };

  const handleUpdateService = async (data: ServiceFormData) => {
    if (editingService) {
      await updateService(editingService.id, data, userId);
      setEditingService(null);
      setShowForm(false);
    }
  };

  const handleDeleteService = async () => {
    if (deletingServiceId) {
      await deleteService(deletingServiceId, userId);
      setDeletingServiceId(null);
    }
  };

  const handleEditService = (service: UserService) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleToggleStatus = async (serviceId: string, isActive: boolean) => {
    await toggleServiceStatus(serviceId, isActive, userId);
  };

  const activeServices = services.filter(service => service.isActive);
  const inactiveServices = services.filter(service => !service.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          <h2 className="text-xl font-semibold">
            {isOwner ? 'My Services' : 'Services Offered'}
          </h2>
          <span className="text-sm text-muted-foreground">
            ({services.length})
          </span>
        </div>
        
        {isOwner && (
          <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        )}
      </div>

      {/* Services Grid */}
      {services.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isOwner ? 'No services yet' : 'No services available'}
          </h3>
          <p className="text-gray-500 mb-4">
            {isOwner 
              ? 'Start showcasing your expertise by adding your first service.' 
              : 'This user hasn\'t added any services yet.'
            }
          </p>
          {isOwner && (
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Service
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Services */}
          {activeServices.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Active Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isOwner={isOwner}
                    onEdit={handleEditService}
                    onDelete={setDeletingServiceId}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Inactive Services (only show to owner) */}
          {isOwner && inactiveServices.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-muted-foreground">Inactive Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inactiveServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isOwner={isOwner}
                    onEdit={handleEditService}
                    onDelete={setDeletingServiceId}
                    onToggleStatus={handleToggleStatus}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Service Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Create New Service'}
            </DialogTitle>
          </DialogHeader>
          <ServiceForm
            service={editingService || undefined}
            onSubmit={editingService ? handleUpdateService : handleCreateService}
            onCancel={() => {
              setShowForm(false);
              setEditingService(null);
            }}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingServiceId} onOpenChange={() => setDeletingServiceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ServicesManager;
