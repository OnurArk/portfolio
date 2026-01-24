"use client";

import { Typography, Box } from "@mui/material";
import { useTranslations, useLocale } from "@/contexts/LocaleContext";
import { useTheme } from "@mui/material/styles";

export function Projects() {
  const t = useTranslations();
  const theme = useTheme();
  const { locale } = useLocale();

  const turkishContent = (
    <>
      <Typography variant="h5" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
        Frontend Developer – Smart Marine
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
        Smart Marine bünyesinde, kapalı ağ (closed network) üzerinde çalışan donanım tabanlı sistemler için frontend uygulamalar geliştirdim. Bu projeler, internete açık olmayan; frontend ve backend&apos;in doğrudan cihaza yüklendiği, telefon boyutundan daha büyük endüstriyel cihazlara kadar uzanan farklı donanımlarda çalışacak şekilde tasarlandı.
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
        Bu nedenle projelerim açık kaynak ya da online platformlarda paylaşılmamaktadır. Ancak süreç boyunca 20&apos;den fazla production seviyesinde frontend uygulaması geliştirdim ve tamamı ileri düzey, modüler ve ölçeklenebilir mimari ile hayata geçirildi.
      </Typography>

      <Typography variant="h6" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
        Teknik Sorumluluklar ve Kullanılan Teknolojiler
      </Typography>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Framework & Kütüphaneler
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Next.js (App Router ve Pages Router)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">React, Preact</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Material UI (MUI)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">TypeScript (çoğu projede)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">JavaScript</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Uygulama Mimarisi
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Modüler ve ölçeklenebilir frontend mimarisi</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Custom React Hooks kullanımı</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Context API ve Redux Store ile state management</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Redux dispatch ve global state senaryoları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        İletişim & Gerçek Zamanlı Veri
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">WebSocket tabanlı gerçek zamanlı veri iletişimi</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">REST API entegrasyonları (Axios)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Donanım ile senkron çalışan frontend yapıları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Authentication & Security
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Access & Refresh Token tabanlı kimlik doğrulama</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Oturum yönetimi ve güvenli API erişimi</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Form & UI Yapıları
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">İleri seviye, dinamik ve validasyonlu form yapıları</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Responsive mobil tasarım</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Tema sistemleri: Light / Dark / Dusk / Night (projeye göre)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Gauge, dashboard ve veri görselleştirme bileşenleri</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">FAQ, notification ve kullanıcı bilgilendirme ekranları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Performans & Optimizasyon
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">100 KB altı düşük boyutlu uygulamalar</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Donanım kısıtlarına uygun performans optimizasyonları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Uluslararasılaştırma (i18n)
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">i18next ile çoklu dil desteği</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Dinamik dil geçişleri</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Medya & Asset Yönetimi
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Dinamik görseller ve QR kod üretimi</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Local ortamda yönetilen Iconify tabanlı ikon yapıları</Typography></li>
      </Box>

      <Typography variant="body1" color="text.primary" sx={{ mt: 3, fontStyle: "italic" }}>
        Bu projeler, gömülü sistemler ve özel donanımlar üzerinde çalışan modern frontend uygulamaları geliştirme konusunda ileri düzey deneyim kazanmamı sağlamıştır.
      </Typography>
    </>
  );

  const englishContent = (
    <>
      <Typography variant="h5" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
        Frontend Developer – Smart Marine
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
        At Smart Marine, I worked on frontend applications for hardware-based systems operating on a closed network. These projects were not publicly accessible; both frontend and backend applications were deployed directly onto devices, ranging from phone-sized units to larger industrial hardware.
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 3 }}>
        Due to confidentiality and network restrictions, these projects cannot be shared publicly. However, during this time I developed 20+ production-level frontend applications, all built with an advanced, modular, and scalable architecture.
      </Typography>

      <Typography variant="h6" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
        Responsibilities & Technologies
      </Typography>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Frameworks & Libraries
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Next.js (App Router and Pages Router)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">React, Preact</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Material UI (MUI)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">TypeScript (used in most projects)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">JavaScript</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Application Architecture
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Modular and scalable frontend architecture</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Extensive use of custom React hooks</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">State management with Context API and Redux</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Redux store dispatch patterns for complex global states</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Communication & Real-Time Data
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">WebSocket-based real-time data handling</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">REST API integrations using Axios</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Frontend systems synchronized directly with hardware devices</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Authentication & Security
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Token-based authentication (Access & Refresh Tokens)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Secure session and API access management</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Forms & UI Systems
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Advanced, dynamic, and validated form structures</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Fully responsive mobile-first designs</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Theme systems: Light / Dark / Dusk / Night (project-dependent)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Gauges, dashboards, and data visualization components</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Notification systems and FAQ-style informational interfaces</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Performance & Optimization
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Ultra-lightweight applications under 100 KB</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Performance optimizations tailored for hardware constraints</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Internationalization (i18n)
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Multi-language support using i18next</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Dynamic language switching</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600 }}>
        Media & Asset Management
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span">Dynamic image handling and QR code generation</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span">Locally managed Iconify-based icon systems</Typography></li>
      </Box>

      <Typography variant="body1" color="text.primary" sx={{ mt: 3, fontStyle: "italic" }}>
        These projects provided strong hands-on experience in building high-performance frontend applications for embedded systems and specialized hardware environments.
      </Typography>
    </>
  );

  return (
    <>
      <Typography variant="h4" color={theme.palette.primary.light} sx={{ alignSelf: "center" }}>
        {t("dashboard.projects.title")}
      </Typography>
      {locale === "tr" ? turkishContent : englishContent}
    </>
  );
}