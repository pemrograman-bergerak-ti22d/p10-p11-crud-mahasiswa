import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonButton, IonButtons,
  IonInput, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent,
  IonItemSliding, IonItemOptions, IonItemOption, IonNote, // Import tambahan
  AlertController, ToastController 
} from '@ionic/angular/standalone';

import { ApiService } from '../services/api.services';
import { Mahasiswa, MahasiswaDTO } from '../interfaces/mahasiswa';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonButton,
    IonInput, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonSelect, IonSelectOption, IonSearchbar, IonRefresher, IonRefresherContent,
    IonItemSliding, IonItemOptions, IonItemOption, IonNote // Tambahkan ke imports
  ]
})
export class HomePage implements OnInit {
  
  allMahasiswa: Mahasiswa[] = [];
  filteredMahasiswa: Mahasiswa[] = [];

  inputNama: string = '';
  inputJurusan: string = '';
  idEdit: number | null = null;

  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData(event?: any) {
    this.api.getMahasiswa().subscribe({
      next: (res) => {
        this.allMahasiswa = res;
        this.filteredMahasiswa = res;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error(err);
        if (event) event.target.complete();
      }
    });
  }

  handleRefresh(event: any) {
    this.loadData(event);
  }

  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredMahasiswa = this.allMahasiswa.filter(mhs => 
      mhs.nama.toLowerCase().includes(query)
    );
  }

  simpanData() {
    if (!this.inputNama || !this.inputJurusan) {
      this.tampilkanToast('Nama dan Jurusan harus diisi!', 'warning');
      return;
    }

    const data: MahasiswaDTO = {
      nama: this.inputNama,
      jurusan: this.inputJurusan
    };

    if (this.idEdit) {
      this.api.updateMahasiswa(this.idEdit, data).subscribe(() => {
        this.tampilkanToast('Data berhasil diperbarui', 'success');
        this.resetForm();
        this.loadData();
      });
    } else {
      this.api.tambahMahasiswa(data).subscribe(() => {
        this.tampilkanToast('Data berhasil ditambahkan', 'success');
        this.resetForm();
        this.loadData();
      });
    }
  }

  // Fungsi saat tombol EDIT ditekan
  editData(mhs: Mahasiswa) {
    this.idEdit = mhs.id;
    this.inputNama = mhs.nama;
    this.inputJurusan = mhs.jurusan; 
    
    // Opsional: Scroll ke atas agar user melihat form
    const content = document.querySelector('ion-content');
    content?.scrollToTop(500);
  }

  resetForm() {
    this.idEdit = null;
    this.inputNama = '';
    this.inputJurusan = '';
  }

  // Fungsi saat tombol HAPUS ditekan
  async konfirmasiHapus(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Data?',
      message: 'Yakin ingin menghapus data ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          role: 'confirm',
          handler: () => {
            this.api.deleteMahasiswa(id).subscribe(() => {
              this.tampilkanToast('Data dihapus', 'danger');
              this.loadData();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async tampilkanToast(pesan: string, warna: string) {
    const toast = await this.toastCtrl.create({
      message: pesan,
      duration: 2000,
      color: warna,
      position: 'bottom'
    });
    await toast.present();
  }
}