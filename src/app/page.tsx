import { type Metadata } from "next";
import { asText } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function HomePage() {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return (
      <main>
        <SliceZone slices={home.data.slices} components={components} />
      </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      description: home.data.meta_description ?? undefined,
      images: [
        {
          url: home.data.meta_image?.url || "/default-og-image.png",
          width: 1200,
          height: 630,
          alt: home.data.meta_title ?? "Preview Image",
        },
      ],
    },
  };
}
