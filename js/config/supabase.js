import { createClient }
from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl =
'https://jhckaiqltghuzuklragu.supabase.co'

const supabaseKey =
'PASTE_PUBLISHABLE_KEY_DISINI'

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)
