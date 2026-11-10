import { supabase }
from '../config/supabase-config.js';

export class SupabaseService {

    static async getGuru() {

        const {
            data,
            error
        } = await supabase
            .from('guru')
            .select('*');

        if (error) {
            console.error(error);
            return [];
        }

        return data;
    }

}
