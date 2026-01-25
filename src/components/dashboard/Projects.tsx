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
      <Typography variant="h5" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600 , fontSize: {xs: "1.2rem", sm: "1.4rem", md: "1.6rem", lg: "1.8rem"}}}>
        Frontend Developer – Smart Marine
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 2, fontSize: {xs: "0.85rem", sm: "0.95rem", md: "1rem", lg: "1.1rem"} }}>
        Smart Marine bünyesinde, kapalı ağ (closed network) üzerinde çalışan donanım tabanlı sistemler için frontend uygulamalar geliştirdim. Bu projeler, internete açık olmayan; frontend ve backend&apos;in doğrudan cihaza yüklendiği, telefon boyutundan daha büyük endüstriyel cihazlara kadar uzanan farklı donanımlarda çalışacak şekilde tasarlandı.
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 3, fontSize: {xs: "0.85rem", sm: "0.95rem", md: "1rem", lg: "1.1rem"} }}>
        Bu nedenle projelerim açık kaynak ya da online platformlarda paylaşılmamaktadır. Ancak süreç boyunca 20&apos;den fazla production seviyesinde frontend uygulaması geliştirdim ve tamamı ileri düzey, modüler ve ölçeklenebilir mimari ile hayata geçirildi.
      </Typography>

      <Typography variant="h6" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600, fontSize: {xs: "1rem", sm: "1.2rem", md: "1.4rem", lg: "1.6rem"} }}>
        Teknik Sorumluluklar ve Kullanılan Teknolojiler
      </Typography>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Framework & Kütüphaneler
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Next.js (App Router ve Pages Router)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>React, Preact</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Material UI (MUI)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>TypeScript (çoğu projede)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>JavaScript</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Uygulama Mimarisi
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Modüler ve ölçeklenebilir frontend mimarisi</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Custom React Hooks kullanımı</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Context API ve Redux Store ile state management</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Redux dispatch ve global state senaryoları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        İletişim & Gerçek Zamanlı Veri
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>WebSocket tabanlı gerçek zamanlı veri iletişimi</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>REST API entegrasyonları (Axios)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Donanım ile senkron çalışan frontend yapıları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Authentication & Security
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Access & Refresh Token tabanlı kimlik doğrulama</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Oturum yönetimi ve güvenli API erişimi</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Form & UI Yapıları
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>İleri seviye, dinamik ve validasyonlu form yapıları</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Responsive mobil tasarım</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Tema sistemleri: Light / Dark / Dusk / Night (projeye göre)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Gauge, dashboard ve veri görselleştirme bileşenleri</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>FAQ, notification ve kullanıcı bilgilendirme ekranları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Performans & Optimizasyon
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>100 KB altı düşük boyutlu uygulamalar</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Donanım kısıtlarına uygun performans optimizasyonları</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Uluslararasılaştırma (i18n)
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>i18next ile çoklu dil desteği</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Dinamik dil geçişleri</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Medya & Asset Yönetimi
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Dinamik görseller ve QR kod üretimi</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Local ortamda yönetilen Iconify tabanlı ikon yapıları</Typography></li>
      </Box>

      <Typography variant="body1" color="text.primary" sx={{ mt: 3, fontStyle: "italic", fontSize: {xs: "0.85rem", sm: "0.95rem", md: "1rem", lg: "1.1rem"} }}>
        Bu projeler, gömülü sistemler ve özel donanımlar üzerinde çalışan modern frontend uygulamaları geliştirme konusunda ileri düzey deneyim kazanmamı sağlamıştır.
      </Typography>
    </>
  );

  const englishContent = (
    <>
      <Typography variant="h5" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600, fontSize: {xs: "1.2rem", sm: "1.4rem", md: "1.6rem", lg: "1.8rem"} }}>
        Frontend Developer – Smart Marine
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 2, fontSize: {xs: "0.85rem", sm: "0.95rem", md: "1rem", lg: "1.1rem"} }}>
        At Smart Marine, I worked on frontend applications for hardware-based systems operating on a closed network. These projects were not publicly accessible; both frontend and backend applications were deployed directly onto devices, ranging from phone-sized units to larger industrial hardware.
      </Typography>
      <Typography variant="body1" color="text.primary" sx={{ mb: 3, fontSize: {xs: "0.85rem", sm: "0.95rem", md: "1rem", lg: "1.1rem"} }}>
        Due to confidentiality and network restrictions, these projects cannot be shared publicly. However, during this time I developed 20+ production-level frontend applications, all built with an advanced, modular, and scalable architecture.
      </Typography>

      <Typography variant="h6" color="text.primary" sx={{ mt: 3, mb: 2, fontWeight: 600, fontSize: {xs: "1rem", sm: "1.2rem", md: "1.4rem", lg: "1.6rem"} }}>
        Responsibilities & Technologies
      </Typography>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Frameworks & Libraries
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Next.js (App Router and Pages Router)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>React, Preact</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Material UI (MUI)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>TypeScript (used in most projects)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>JavaScript</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Application Architecture
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Modular and scalable frontend architecture</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Extensive use of custom React hooks</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>State management with Context API and Redux</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Redux store dispatch patterns for complex global states</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Communication & Real-Time Data
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>WebSocket-based real-time data handling</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>REST API integrations using Axios</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Frontend systems synchronized directly with hardware devices</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Authentication & Security
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Token-based authentication (Access & Refresh Tokens)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Secure session and API access management</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Forms & UI Systems
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Advanced, dynamic, and validated form structures</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Fully responsive mobile-first designs</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Theme systems: Light / Dark / Dusk / Night (project-dependent)</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Gauges, dashboards, and data visualization components</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Notification systems and FAQ-style informational interfaces</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Performance & Optimization
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Ultra-lightweight applications under 100 KB</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Performance optimizations tailored for hardware constraints</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Internationalization (i18n)
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Multi-language support using i18next</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Dynamic language switching</Typography></li>
      </Box>

      <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2, mb: 1, fontWeight: 600, fontSize: {xs: "0.9rem", sm: "1rem", md: "1.1rem", lg: "1.2rem"} }}>
        Media & Asset Management
      </Typography>
      <Box component="ul" sx={{ pl: 3, mb: 2 }}>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Dynamic image handling and QR code generation</Typography></li>
        <li><Typography variant="body2" color="text.primary" component="span" sx={{ fontSize: {xs: "0.75rem", sm: "0.85rem", md: "0.9rem", lg: "1rem"} }}>Locally managed Iconify-based icon systems</Typography></li>
      </Box>

      <Typography variant="body1" color="text.primary" sx={{ mt: 3, fontStyle: "italic", fontSize: {xs: "0.85rem", sm: "0.95rem", md: "1rem", lg: "1.1rem"} }}>
        These projects provided strong hands-on experience in building high-performance frontend applications for embedded systems and specialized hardware environments.
      </Typography>
    </>
  );

  return (
    <>
      <Typography variant="h4" color={theme.palette.primary.light} sx={{ alignSelf: "center" , fontSize: {xs: "1.6rem", sm: "1.8rem", md: "2rem", lg: "2.2rem"}}}>
        {t("dashboard.projects.title")}
      </Typography>
      {locale === "tr" ? turkishContent : englishContent}
    </>
  );
}