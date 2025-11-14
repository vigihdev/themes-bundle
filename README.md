# @vigihdev/themes-bundle

Toolkit build sederhana untuk mengelola **themes**, **styles**, dan **components** menggunakan custom Grunt executor. Dibuat untuk workflow proyek VigihDev agar proses kompilasi,, build, dan distribusi menjadi lebih mudah dan konsisten.

---

## 🚀 Fitur Utama

- Modular dan fleksibel
- Tanpa instalasi Grunt global
- Mendukung tasks: themes, styles, components, bootstrap
- Build, dist, clean, fresh, test
- Output log rapi dan informatif
- Bisa dipanggil melalui NPM scripts atau CLI

---

## 📦 Instalasi

```bash
npm install @vigihdev/themes-bundle --save-dev
```

Atau untuk lokal development:

```bash
git clone https://github.com/vigihdev/themes-bundle.git
cd themes-bundle
npm install
```

---

## ⚡ Penggunaan

### **Menjalankan task melalui NPM script**

```bash
npm run grunt -- themes
npm run grunt -- themes:dist
npm run grunt -- themes_styles:build
npm run grunt -- themes_bootstrap:clean
```

Atau gunakan alias yang sudah disediakan:

```bash
npm run grunt:themes:build
npm run grunt:styles:dist
npm run grunt:components:clean
```

### **Menjalankan Test Task**

```bash
npm run themes_bundle:test
```

---

## 🧩 Daftar Scripts

### **Base Executor**

```bash
npm run grunt -- <task>
```

### **Themes**

- `grunt:themes`
- `grunt:themes:dist`
- `grunt:themes:build`
- `grunt:themes:clean`
- `grunt:themes:fresh`

### **Styles**

- `grunt:styles`
- `grunt:styles:dist`
- `grunt:styles:clean`
- `grunt:styles:fresh`
- `grunt:styles:build`

### **Components**

- `grunt:components`
- `grunt:components:dist`
- `grunt:components:clean`
- `grunt:components:build`

### **Bootstrap Themes**

- `grunt:themes-bs`
- `grunt:themes-bs:dist`
- `grunt:themes-bs:build`
- `grunt:themes-bs:clean`

---

## 🏗️ Struktur Direktori (Contoh)

```
src/
  process/
    scripts/
      themes-bundle-grunt.js
  themes-styles/
    builds/
    dist/
  themes-components/
  themes-bootstrap/
```

---

## 🛠️ Custom Grunt Executor

Semua task dijalankan melalui script internal:

```
src/process/scripts/themes-bundle-grunt.js
```

Script ini menyediakan:

- Validasi environment
- Logging yang rapi
- Eksekusi child-process Node
- Direktori kerja fleksibel
- Output konsisten

---

## 📄 Lisensi

MIT © 2025 vigihdev

---

## 🤝 Kontribusi

Pull request sangat diterima! Silakan buat issue jika menemukan masalah atau butuh fitur baru.
