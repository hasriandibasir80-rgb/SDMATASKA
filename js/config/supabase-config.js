import { createClient }
from 'https://esm.sh/@supabase/supabase-js';

const SUPABASE_URL =
'https://jhckaiqltghuzuklragu.supabase.co';

const SUPABASE_KEY =
'sb_publishable_DG6-r8_uyN1uInYPjO4jgA__32za120';

export const supabase =
createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
