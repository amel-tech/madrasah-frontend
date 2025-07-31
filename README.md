# madrasah-frontend

Online Medrese Projesi için frontend deposu. Bu proje Turborepo kullanılarak monorepo yapısında geliştirilmiştir.

## Teknoloji Yığını

- **Next.js 14** - App Router ile React framework
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Radix UI ve Tailwind CSS ile oluşturulmuş yeniden kullanılabilir bileşenler
- **TypeScript** - Tip güvenliği
- **Turborepo** - Build sistemi ve monorepo yönetimi

## Başlangıç

### Gereksinimler

- Node.js 18+
- npm 8+

### Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Tüm paketleri build edin:

```bash
npm run build
```

### Kullanılabilir Komutlar

- `npm run dev` - Tüm uygulamalar için geliştirme sunucularını başlatır
- `npm run build` - Tüm paketleri ve uygulamaları build eder
- `npm run lint` - Tüm paketleri lint eder
- `npm run format` - Prettier ile kodu formatlar
- `npm run clean` - Tüm build dosyalarını temizler

## Proje Yapısı

Bu proje monorepo yapısında organize edilmiştir. Her bağımsız frontend uygulaması `apps/` dizininde, paylaşılan kod ise `shared/` dizininde bulunur.

### Shadcn/ui Bileşenleri Ekleme

Paylaşılan UI paketine yeni Shadcn/ui bileşenleri eklemek için:

1. Bileşen dosyasını `shared/ui/src/components/` dizinine ekleyin
2. `shared/ui/src/index.ts` dosyasından export edin
3. Uygulamalarda `@madrasah/ui` paketinden import edin

Örnek:

```tsx
import { Button, Card } from '@madrasah/ui';
```

## Dizin Yapısı

```
.
├── apps/                    # Her bağımsız frontend uygulaması burada bulunur
│   └── web/                 # Ana frontend uygulaması (Next.js)
│       ├── app/             # App Router yapısı
│       ├── components/      # Projeye özel bileşenler
│       ├── lib/             # Yerel yardımcılar ve utilities
│       └── ...
│
├── shared/                  # Frontend uygulamaları arasında paylaşılan kod
│   ├── ui/                  # Paylaşılan UI bileşenleri (wrappers veya ortak UI'lar)
│   ├── hooks/               # Paylaşılan React hooks
│   ├── utils/               # Paylaşılan utility fonksiyonları
│   ├── types/               # Paylaşılan TypeScript tipleri
│   └── ...
│
├── .env                     # Temel environment değişkenleri (uygulama bazında override edilebilir)
├── turbo.json               # Turborepo konfigürasyonu
├── package.json             # Root seviye bağımlılıklar ve scriptler
└── tsconfig.base.json       # Paylaşılan TypeScript konfigürasyonu
```
