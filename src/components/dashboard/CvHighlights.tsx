"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "@/contexts/LocaleContext";

export function CvHighlights() {
  const t = useTranslations();
  const theme = useTheme();

  const experienceItems = [
    t("dashboard.cv.experience.item1"),
    t("dashboard.cv.experience.item2"),
    t("dashboard.cv.experience.item3"),
    t("dashboard.cv.experience.item4"),
  ];

  const stackItems = [
    t("dashboard.cv.stack.item1"),
    t("dashboard.cv.stack.item2"),
    t("dashboard.cv.stack.item3"),
  ];

  return (
    <>
      <Typography
        variant="h4"
        color={theme.palette.primary.light}
        sx={{ alignSelf: "center", fontSize: { xs: "1.6rem", sm: "1.8rem", md: "2rem", lg: "2.2rem" } }}
      >
        {t("dashboard.cv.title")}
      </Typography>
      <Card>
        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Stack spacing={2.5}>
            <Typography color="text.primary" sx={{ fontSize: { xs: "0.88rem", sm: "0.95rem", md: "1rem" } }}>
              {t("dashboard.cv.summary")}
            </Typography>
            <Typography color={theme.palette.primary.light} sx={{ fontWeight: 600, fontSize: { xs: "0.92rem", sm: "1rem", md: "1.05rem" } }}>
              {t("dashboard.cv.role")}
            </Typography>

            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}>
                  {t("dashboard.cv.experience.title")}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.4 }}>
                  {experienceItems.map((item) => (
                    <li key={item}>
                      <Typography color="text.primary" component="span" sx={{ fontSize: { xs: "0.8rem", sm: "0.88rem", md: "0.92rem" } }}>
                        {item}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}>
                  {t("dashboard.cv.stack.title")}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.4 }}>
                  {stackItems.map((item) => (
                    <li key={item}>
                      <Typography color="text.primary" component="span" sx={{ fontSize: { xs: "0.8rem", sm: "0.88rem", md: "0.92rem" } }}>
                        {item}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" } }}>
                  {t("dashboard.cv.languages.title")}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 2.4 }}>
                  <li>
                    <Typography color="text.primary" component="span" sx={{ fontSize: { xs: "0.8rem", sm: "0.88rem", md: "0.92rem" } }}>
                      {t("dashboard.cv.languages.item1")}
                    </Typography>
                  </li>
                  <li>
                    <Typography color="text.primary" component="span" sx={{ fontSize: { xs: "0.8rem", sm: "0.88rem", md: "0.92rem" } }}>
                      {t("dashboard.cv.languages.item2")}
                    </Typography>
                  </li>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
