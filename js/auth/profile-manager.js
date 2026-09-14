import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { db } from '../config/service-firebase.js';

export class ProfileManager {
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  // Mengambil data profil user yang sedang login
  getCurrentUser() {
    return this.currentUser;
  }

  // Fungsi untuk auto-fill form berdasarkan ID elemen input
  autoFillForm(nameId, nipId) {
    if (!this.currentUser) return;

    const nameInput = document.getElementById(nameId);
    const nipInput = document.getElementById(nipId);

    if (nameInput) nameInput.value = this.currentUser.nama || '';
    if (nipInput) nipInput.value = this.currentUser.nip || '';
  }

  // Mengambil data Kepala Sekolah untuk Kop Persuratan
  async getKepsekData() {
    try {
      // Asumsi: Ada dokumen 'settings' dengan ID 'school_profile' di Firestore
      // yang berisi field: nama_kepsek dan nip_kepsek
      const settingsDoc = await getDoc(doc(db, 'settings', 'school_profile'));
      
      if (settingsDoc.exists()) {
        return settingsDoc.data();
      }
      return { nama_kepsek: 'Nama Kepala Sekolah', nip_kepsek: 'NIP Kepala Sekolah' };
    } catch (error) {
      console.error("Gagal mengambil data Kepsek:", error);
      return { nama_kepsek: '-', nip_kepsek: '-' };
    }
  }

  // Helper untuk generate Kop Surat (akan digunakan oleh kop-generator.js nanti)
  async generateKopData() {
    const user = this.getCurrentUser();
    const kepsek = await this.getKepsekData();
    
    return {
      pembuat: user.nama,
      nip_pembuat: user.nip,
      jabatan_pembuat: this.getJabatanLabel(user.role),
      nama_kepsek: kepsek.nama_kepsek,
      nip_kepsek: kepsek.nip_kepsek
    };
  }

  getJabatanLabel(role) {
    const labels = {
      'super_admin': 'Administrator',
      'kepala_sekolah': 'Kepala Sekolah',
      'staf_tu': 'Staf Tata Usaha',
      'wali_kelas': 'Wali Kelas',
      'guru_mapel': 'Guru Mata Pelajaran',
      'siswa': 'Siswa',
      'orang_tua': 'Orang Tua/Wali'
    };
    return labels[role] || 'Pengguna';
  }
}
