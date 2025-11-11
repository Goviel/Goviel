-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  comentario TEXT
);

-- Enable RLS
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert contacts (public contact form)
CREATE POLICY "Anyone can insert contacts"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to view their own contacts (optional)
CREATE POLICY "Users can view all contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Create chats table (read by admin, written by n8n via service role)
CREATE TABLE public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT DEFAULT 'nuevo',
  browser_id TEXT,
  telefono TEXT,
  summary TEXT,
  files JSONB,
  images JSONB
);

-- Enable RLS
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

-- Allow service role (n8n) to insert and update chats
CREATE POLICY "Service role can insert chats"
ON public.chats
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update chats"
ON public.chats
FOR UPDATE
TO service_role
USING (true);

-- Allow authenticated users (admin) to read all chats
CREATE POLICY "Authenticated users can view all chats"
ON public.chats
FOR SELECT
TO authenticated
USING (true);

-- Create metrics table for analytics tracking
CREATE TABLE public.metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_type TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert metrics (for tracking)
CREATE POLICY "Anyone can insert metrics"
ON public.metrics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow authenticated users to view metrics
CREATE POLICY "Authenticated users can view metrics"
ON public.metrics
FOR SELECT
TO authenticated
USING (true);

-- Create indexes for better performance
CREATE INDEX idx_contacts_created_at ON public.contacts(created_at DESC);
CREATE INDEX idx_chats_created_at ON public.chats(created_at DESC);
CREATE INDEX idx_chats_status ON public.chats(status);
CREATE INDEX idx_metrics_created_at ON public.metrics(created_at DESC);
CREATE INDEX idx_metrics_event_type ON public.metrics(event_type);