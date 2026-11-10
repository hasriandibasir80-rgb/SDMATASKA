import { createClient }
from 'https://esm.sh/@supabase/supabase-js';

const SUPABASE_URL =
'https://jhckaiqltghuzuklragu.supabase.co';

const SUPABASE_KEY =
'PASTE_PUBLISHABLE_KEY_ANDA';

export const supabase =
createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
