# Avukado Backend API

Node.js Express ve MongoDB ile geliştirilmiş backend API.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. `.env` dosyası oluşturun (`.env.example` dosyasını referans alın):
```bash
cp .env.example .env
```

3. `.env` dosyasındaki değerleri düzenleyin:
- `MONGO_URI`: MongoDB bağlantı string'iniz
- `JWT_SECRET`: Güvenli bir JWT secret key
- `PORT`: Server portu (varsayılan: 3000)

4. MongoDB'nin çalıştığından emin olun

5. Server'ı başlatın:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Auth
- `POST /api/Auth/login` - Kullanıcı girişi
- `POST /api/Auth/register` - Kullanıcı kaydı

### Ads (İlanlar)
- `GET /api/Ads` - Tüm ilanları listele
- `GET /api/Ads/:id` - Tek ilan getir
- `POST /api/Ads` - İlan oluştur (Auth gerekli)
- `PUT /api/Ads/:id` - İlan güncelle (Auth gerekli)
- `DELETE /api/Ads/:id` - İlan sil (Auth gerekli)
- `GET /api/Ads/:id/proposals` - İlan tekliflerini getir (Auth gerekli)

### Lawyers (Avukatlar)
- `GET /api/Lawyers` - Tüm avukatları listele
- `GET /api/Lawyers/:id` - Tek avukat getir

## Authentication

Protected route'lar için `Authorization` header'ında Bearer token gönderilmelidir:

```
Authorization: Bearer <token>
```

## Veritabanı Modelleri

### User
- name, email, password, role (client/lawyer)
- Avukatlar için: tckn, baroNo, idFront, idBack, isVerified

### Ad
- title, description, category, city
- client (User referansı)
- status, documents, budget, proposals

### Proposal
- ad (Ad referansı)
- lawyer (User referansı)
- message, price, status

