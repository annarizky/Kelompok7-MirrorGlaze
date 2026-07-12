// Konfigurasi Supabase Client
// GANTI 'YOUR_SUPABASE_URL' dan 'YOUR_SUPABASE_ANON_KEY' dengan kredensial dari dashboard Supabase Anda (Project Settings -> API).
const SUPABASE_URL = 'https://hzrrlskqesqhpmryzxsn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6cnJsc2txZXNxaHBtcnl6eHNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NjgyOTYsImV4cCI6MjA5OTM0NDI5Nn0.1sQfTDGV6yheOH2r-mh2X5AccTsosh0hGGpRzoxj-7Q';

let supabaseClient;

if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
    console.warn("PERINGATAN: Supabase URL atau Anon Key belum dikonfigurasi di assets/js/supabaseClient.js!");
}

// Inisialisasi client menggunakan library global dari CDN jika URL & Key sudah dikonfigurasi
if (typeof supabase !== 'undefined') {
    if (SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
        try {
            supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        } catch (error) {
            console.error("Error inisialisasi Supabase Client:", error);
        }
    } else {
        console.warn("Supabase Client belum diinisialisasi karena URL/Key masih berupa placeholder.");
    }
} else {
    console.error("Gagal memuat library Supabase dari CDN. Pastikan script CDN Supabase dipasang sebelum file ini.");
}

// Helper function untuk mengecek session login secara global
async function getCurrentUser() {
    if (!supabaseClient) return null;
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    if (error) {
        return null;
    }
    return user;
}
