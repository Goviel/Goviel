-- Create public bucket for chat uploads
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat_uploads', 'chat_uploads', true);

-- Policy for SELECT: Anyone can view files (public bucket)
CREATE POLICY "Anyone can view chat uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'chat_uploads');

-- Policy for INSERT: Only authenticated users can upload files
CREATE POLICY "Authenticated users can upload chat files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'chat_uploads');

-- Policy for UPDATE: Only authenticated users can update their files
CREATE POLICY "Authenticated users can update chat files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'chat_uploads')
WITH CHECK (bucket_id = 'chat_uploads');

-- Policy for DELETE: Only authenticated users can delete files
CREATE POLICY "Authenticated users can delete chat files"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'chat_uploads');