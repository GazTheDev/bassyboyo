"use server";

import prisma from "@/lib/prisma";

export type SearchResult = {
  id: string;
  title: string;
  type: "download" | "article";
  category: string;
};

export async function searchContent(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 2) return [];

  try {
    // 1. Search Downloads
    const downloads = await prisma.download.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive', // Case insensitive search
        },
      },
      take: 3,
      select: { id: true, title: true, category: true },
    });

    // 2. Search Articles
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      take: 3,
      select: { id: true, title: true, category: true },
    });

    // 3. Format results
    const formattedDownloads: SearchResult[] = downloads.map((d) => ({
      ...d,
      type: "download",
    }));

    const formattedArticles: SearchResult[] = articles.map((a) => ({
      ...a,
      type: "article",
    }));

    // Combine them
    return [...formattedDownloads, ...formattedArticles];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}