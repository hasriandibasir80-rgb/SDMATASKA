import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { db } from '../config/service-firebase.js';

export class ProfileManager {
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.auth = getAuth();
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async loadProfileToForm() {
    if (!this.currentUser || !this.currentUser.uid) return;

    try {
      const userRef = doc(db, 'schools', this.currentUser.npsn, 'users', this.currentUser.uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        const data = userSnap.data();
        document.getElementById('prof-foto').value = data.foto_url || '';
        document.getElementById('prof-nama').value = data.nama || '';
        document.getElementById('prof-nip').value = data.nip || '';
        document.getElementById('prof-nohp').value = data.no_hp || '';
        document.getElementById('prof-sekolah').value = data.nama_sekolah || '';
        document.getElementById('prof-npsn').value = data.npsn || '';
        document.getElementById('prof-kepsek').value = data.nama_kepsek || '-';
        document.getElementById('prof-nipkepsek').value = data.nip_kepsek || '-';
      }
    } catch (error) {
      console.error("Gagal memuat profil:", error);
      alert("Gagal memuat data profil.");
    }
  }

  async saveProfileData(formData) {
    if (!this.currentUser || !this.currentUser.uid) return;

    try {
      const userRef = doc(db, 'schools', this.currentUser.npsn, 'users', this.currentUser.uid);
      const rootUserRef = doc(db, 'users', this.currentUser.uid);

      await updateDoc(userRef, {
        nama: formData.nama,
        nip: formData.nip,
        no_hp: formData.no_hp,
        updated_at: new Date().toISOString()
      });

      await updateDoc(rootUserRef, {
        nama: formData.nama,
        nip: formData.nip,
        no_hp: formData.no_hp
      });

      this.currentUser.nama = formData.nama;
      this.currentUser.nip = formData.nip;
      this.currentUser.no_hp = formData.no_hp;
      sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));

      document.getElementById('prof-nama').readOnly = true;
      document.getElementById('prof-nip').readOnly = true;
      document.getElementById('prof-nohp').readOnly = true;
      document.getElementById('btn-edit-profil').style.display = 'inline-block';
      document.getElementById('btn-simpan-profil').style.display = 'none';
      document.getElementById('btn-batal-profil').style.display = 'none';

      alert("Profil berhasil diperbarui!");
      location.reload();
    } catch (error) {
      console.error("Gagal menyimpan profil:", error);
      alert("Gagal menyimpan perubahan. Periksa koneksi Anda.");
    }
  }

  async requestWhatsAppOtp(noHp) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('temp_otp', otp);
    sessionStorage.setItem('temp_otp_time', Date.now());

    alert(`[SIMULASI WhatsApp]\n\nKode OTP Anda adalah: ${otp}\n\n(Di produksi, kode ini akan dikirim ke ${noHp})`);
    
    document.getElementById('otp-input-group').style.display = 'flex';
    document.getElementById('btn-ganti-password').style.display = 'inline-block';
  }

  async changePasswordWithOtp(pwdLama, pwdBaru, otpInput) {
    const user = this.auth.currentUser;
    const storedOtp = sessionStorage.getItem('temp_otp');
    const otpTime = parseInt(sessionStorage.getItem('temp_otp_time') || '0');

    if (Date.now() - otpTime > 300000) {
      alert("Kode OTP telah kedaluwarsa. Silakan minta kode baru.");
      return;
    }

    if (otpInput !== storedOtp) {
      alert("Kode OTP salah!");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, pwdLama);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, pwdBaru);

      sessionStorage.removeItem('temp_otp');
      sessionStorage.removeItem('temp_otp_time');

      alert("Password berhasil diganti!");
      
      document.getElementById('pwd-lama').value = '';
      document.getElementById('pwd-baru').value = '';
      document.getElementById('pwd-konfirmasi').value = '';
      document.getElementById('pwd-otp').value = '';
      document.getElementById('otp-input-group').style.display = 'none';
      document.getElementById('btn-ganti-password').style.display = 'none';

    } catch (error) {
      console.error("Gagal ganti password:", error);
      if (error.code === 'auth/wrong-password') {
        alert("Password lama yang Anda masukkan salah.");
      } else {
        alert("Gagal mengganti password. Silakan coba lagi.");
      }
    }
  }

  autoFillForm(nameId, nipId) {
    if (!this.currentUser) return;
    const nameInput = document.getElementById(nameId);
    const nipInput = document.getElementById(nipId);
    if (nameInput) nameInput.value = this.currentUser.nama || '';
    if (nipInput) nipInput.value = this.currentUser.nip || '';
  }

  async getKepsekData() {
    try {
      const schoolRef = doc(db, 'schools', this.currentUser.npsn);
      const schoolSnap = await getDoc(schoolRef);
      if (schoolSnap.exists()) {
        const data = schoolSnap.data();
        return { 
          nama_kepsek: data.nama_kepsek || 'Nama Kepala Sekolah', 
          nip_kepsek: data.nip_kepsek || 'NIP Kepala Sekolah' 
        };
      }
      return { nama_kepsek: '-', nip_kepsek: '-' };
    } catch (error) {
      console.error("Gagal mengambil data Kepsek:", error);
      return { nama_kepsek: '-', nip_kepsek: '-' };
    }
  }

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
