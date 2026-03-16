// lib/github.js
// =====================================================
// CONFIGURAÇÃO — edite estas 2 linhas:
// =====================================================
const GITHUB_USER = "EmanuelIna";
const GITHUB_REPO = "abacate-historias";
const BRANCH = "main";
// =====================================================

export const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${BRANCH}`;

export async function fetchStories() {
  const res = await fetch(`${RAW_BASE}/index.json`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Erro ao carregar histórias");
  const data = await res.json();
  return data.map((story) => ({
    ...story,
    capaUrl: story.capa ? `${RAW_BASE}/${story.capa}` : null,
  }));
}

export async function fetchStoryContent(storyId) {
  const res = await fetch(`${RAW_BASE}/${storyId}/texto.md`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Erro ao carregar história");
  return await res.text();
}

export function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function getDaysTogether(anniversaryStr) {
  const d = new Date(anniversaryStr + "T00:00:00");
  return Math.floor((new Date() - d) / (1000 * 60 * 60 * 24));
}
