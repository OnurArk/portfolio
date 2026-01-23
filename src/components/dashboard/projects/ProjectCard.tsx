"use client";

import { Card, CardContent, Stack, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  description: string;
  images: string[];
}

export function ProjectCard({ description, images }: Props) {
  return (
    <Card sx={{ width: "fit-content", height: "fit-content" }}>
      <CardContent>
        <Typography variant="h6">{description}</Typography>
        <Stack direction="row" spacing={2}>
          {images.map((image, index) => (
            <Image key={index} src={image} alt={image} width={100} height={100} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}