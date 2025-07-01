
-- Create enum for pricing types
CREATE TYPE public.pricing_type AS ENUM ('hourly', 'fixed', 'negotiable');

-- Create enum for availability status
CREATE TYPE public.availability_status AS ENUM ('available', 'busy', 'unavailable');

-- Create user_services table
CREATE TABLE public.user_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  expertise_category TEXT,
  expertise_specialization TEXT,
  service_title TEXT NOT NULL,
  service_description TEXT,
  pricing_type pricing_type DEFAULT 'negotiable',
  price_range TEXT,
  availability_status availability_status DEFAULT 'available',
  delivery_time TEXT,
  requirements TEXT,
  portfolio_links TEXT[] DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.user_services ENABLE ROW LEVEL SECURITY;

-- Create policies for user_services
CREATE POLICY "Users can view all active services" 
  ON public.user_services 
  FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Users can view their own services" 
  ON public.user_services 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can create their own services" 
  ON public.user_services 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own services" 
  ON public.user_services 
  FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own services" 
  ON public.user_services 
  FOR DELETE 
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_user_services_user_id ON public.user_services(user_id);
CREATE INDEX idx_user_services_expertise_category ON public.user_services(expertise_category);
CREATE INDEX idx_user_services_active ON public.user_services(is_active);
