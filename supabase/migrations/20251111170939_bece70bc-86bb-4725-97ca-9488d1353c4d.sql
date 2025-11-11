-- Drop existing policies on contacts table
DROP POLICY IF EXISTS "Anyone can insert contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can view all contacts" ON public.contacts;

-- Ensure RLS is enabled
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policy for INSERT: Allow anonymous users (anon) to insert contacts
CREATE POLICY "Public can insert contacts"
ON public.contacts
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for SELECT: Only authenticated users can read contacts
CREATE POLICY "Authenticated users can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (true);

-- Policy for UPDATE: Only authenticated users can update contacts
CREATE POLICY "Authenticated users can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy for DELETE: Only authenticated users can delete contacts
CREATE POLICY "Authenticated users can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (true);