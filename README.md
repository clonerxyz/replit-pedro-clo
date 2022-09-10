## Epilouge



<img width="10%"  src="https://github.com/clonerxyz/tutor-bersama-perbotan/blob/master/cantik.png"><br/>

<b>Big thanks</b> for the pedro whatsapp web js when its using puppeteer and give me headbang : [whatsapp-web.js] (https://github.com/pedroslopez/whatsapp-web.js) module for whatsapp.

> NOTE : Incase not 100 % safe and for sure use its just for testing only

### First of all
```
$ npx prisma init --datasource-provider sqlite
```
```
$ npx prisma generate
```
```
$ npx prisma migrate dev --name dev
```

### Real Time Chat Log
![gambar](https://i.ibb.co/X8qm5s8/Arco-Linux-2022-09-10-19-38-54.png)

### Cara deploy di Replit

Buka replit lalu login menggunakan akun github kalian lalu pilih Create

![gambar](https://i.ibb.co/J3NxfHR/image.png)

<br>
Kalo udah kalian pilih template Node.js trus di title bebas terserah kalian kalo bisa nama yang pendek aja kalo udah langsung pilih create repl

![gambar](https://i.ibb.co/xXTvDM3/image.png)

<br>

Tampilan awal bakal seperti ini kalian close aja yang index.js
![gambar](https://i.ibb.co/SBB20jB/image.png)

Nantinya tampilannya bakal seperti ini
![gambar](https://i.ibb.co/L8Ms87K/image.png)

Langkah selanjutnya kalian git clone repo kalian yang digithub disini kita pake reponya mas clonerxyz

https://github.com/clonerxyz/replit-pedro-clo

ketikan di shell perintah dibawah bisa liat gambar kalo kurang paham

```
git clone https://github.com/clonerxyz/replit-pedro-clo.git
```

![gambar](https://i.ibb.co/dW4LpVm/image.png)

Kalo udah bakal seperti ini tampilannya

![gambar](https://i.ibb.co/HGGH0MM/image.png)

Jika sudah berhasil clone reponya selanjutnya kalian masuk ke folder repo tersebut dalam hal ini berarti `replit-pedro-clo` caranya dengan mengetikan perintah dibawah 

```
cd replit-pedro-clo
```

hasilnya akan seperti gambar dibawah

![gambar](https://i.ibb.co/G9npftX/image.png)


Kalo sudah ketikan perintah `npm install` di shell dan tunggu sampai prosesnya selesai

```
npm instal
```
 
![gambar](https://i.ibb.co/sbnSsKM/image.png)

kalo sudah kalian kembali ke directory awal menggunakan perintah `cd ..`

```
cd ..
```

setelah melakuan perintah `cd ..` ketikan perintah `chromium` lalu pilih `chromium.out`

![gambar](https://i.ibb.co/Z8H0qzF/image.png)

kalo sudah bakal seperti ini

![gambar](https://i.ibb.co/TcxFGRM/image.png)

abis itu ketik di shell `clear` biar bersih lagi lalu tekan ctrl+shift+R

nanti tampilan akan seperti ini gunanya si kalo kata mas clonerxyz di jampi jampi dulu cuakk

![gambar](https://i.ibb.co/L9H634X/image.png)

okeh lanjut step selanjutnya ketik perintah

```
which chromium
```

lalu salin hasilnya disini sih jadi ini (beda beda tiap user).

```
/nix/store/z0b6n2bqlssqwd9va76mb8flcwwzywc9-chromium-98.0.4758.102/bin/chromium
```
detail cek gambar aja ok
![gambar](https://i.ibb.co/dQprDTC/image.png)

kalo sudah disalin kalian buka files masuk folder `replit-pedro-clo` lalu pilih file `index.js`

![gambar](https://i.ibb.co/RpGh2Zv/image.png)

lalu cari di line ke 9 atau cari variable client trus cari kata `executablePath`
disitu ganti path `/usr/bin/chromium` dengan path yg ini `/nix/store/z0b6n2bqlssqwd9va76mb8flcwwzywc9-chromium-98.0.4758.102/bin/chromium`

before
![gambar](https://i.ibb.co/pvtYwvj/image.png)

after
![gambar](https://i.ibb.co/djn6LrX/image.png)

kalo sudah close tab yg index.js dan console terus buka 1 shell lagi sehingga ada 2 shell seperti pict dibawah

![gambar](https://i.ibb.co/DVm8Lb8/image.png)

kalo sudah buka shell pertama lalu ketikan perintah

```
chromium --no-sandbox
```
gunanya buat launching chromium di replt seperti ini.

![gambar](https://i.ibb.co/PrzPtJZ/image.png)

kalo sudah kalian buka shell yang baru terus masuk folder `replit-pedro-clo`

```
cd replit-pedro-clo
```

lalu jalankan perintah

```
npm run start
```

![gambar](https://i.ibb.co/z48TTPQ/image.png)

nah muncul tuh url localhost dan portnya disini 

```
localhost:3111
```

kalian ketikan di browser sebelahnya localhost:3111/qr

![gambar](https://i.ibb.co/qW2jRK1/image.png)

tinggal scan aja tunggu sampai loading di wa hp selesai lalu klik button OK

![gambar](https://i.ibb.co/pP8vs6L/image.png)

buat cek pesan masuk untuk monitoring tinggal localhost:3111

### Tutorial video

- [live deploy dengan bimbingan YME ](https://youtu.be/iHRAd7-aEKA)


 [![clonerxyz](https://github.com/clonerxyz.png?size=100)](https://github.com/clonerxyz) | [![fadil](https://github.com/fdll14.png?size=100)](https://github.com/fdll14) | [![VilosmZX](https://github.com/VilosmZX.png?size=100)](https://github.com/VilosmZX)







