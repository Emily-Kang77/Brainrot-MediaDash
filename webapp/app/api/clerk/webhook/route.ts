import { createSupabaseAdminClient } from '@/utils/supabase-admin-client';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';


export async function POST(req: Request) {
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

// If there are no headers, error out
if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
        status: 400
    });
}

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

    let evt: WebhookEvent;

    // Verify the payload
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        });
    }

  // Handle user creation/update
  if (evt.type === 'user.created' || evt.type === 'user.updated') {
    
    try {

      const supabase = createSupabaseAdminClient();

      // First check if user exists
      const { data: existingUser } = await supabase
      .from('mediaDash_user_data')
      .select()
      .eq('user_id', evt.data.id)
      .single()
        
      // Write if user does not exist
        if (!existingUser) {
            const { error } = await supabase
                .from('mediaDash_user_data')
                .upsert({ 
                user_id: evt.data.id,
                email: evt.data.email_addresses[0].email_address,
                }, {
                onConflict: 'user_id'
                });

            if (error) {
                console.error('Error writing to Supabase:', error)
            }
        }

    } catch (error) {
      console.error('Error in Supabase operation:', error);
      return new Response('Server error', { status: 500 });
    }
  }

  return new Response('Webhook processed', { status: 200 });
}