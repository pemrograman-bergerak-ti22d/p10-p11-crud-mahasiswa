export interface Mahasiswa {
    id: number;
    nama: string;
    jurusan: string;
}

// Interface untuk data yang dikirim (tanpa ID)
export interface MahasiswaDTO {
    nama: string;
    jurusan: string;
}