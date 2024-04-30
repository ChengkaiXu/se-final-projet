import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hfulsregxnzuuygjiomk.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmdWxzcmVneG56dXV5Z2ppb21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMzODY1NjgsImV4cCI6MjAyODk2MjU2OH0.iavxK9vGaAEiNK-nt2pUAL7cL9Oksxbn0IwNPStePqU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
})