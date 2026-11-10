import { createClient }
from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl =
'https://jhckaiqltghuzuklragu.supabase.co'

const supabaseKey =
'sb_publishable_DG6-r8_uyN1uInYPjO4jgA__32za120'

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)
