import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting chat bucket cleanup...');

    // Create Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // List all files in the chat_uploads bucket
    const { data: files, error: listError } = await supabase
      .storage
      .from('chat_uploads')
      .list();

    if (listError) {
      console.error('Error listing files:', listError);
      throw new Error(`Failed to list files: ${listError.message}`);
    }

    console.log(`Found ${files?.length || 0} files to delete`);

    if (!files || files.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No files to delete',
          deletedCount: 0,
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Delete all files
    const filePaths = files.map(file => file.name);
    const { error: deleteError } = await supabase
      .storage
      .from('chat_uploads')
      .remove(filePaths);

    if (deleteError) {
      console.error('Error deleting files:', deleteError);
      throw new Error(`Failed to delete files: ${deleteError.message}`);
    }

    console.log(`Successfully deleted ${filePaths.length} files`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully deleted ${filePaths.length} files`,
        deletedCount: filePaths.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in clear-chat-bucket:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
