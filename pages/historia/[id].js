import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fetchStories, fetchStoryContent, formatDate, RAW_BASE } from '../../lib/github';
import styles from '../../styles/Story.module.css';

export async function getStaticPaths() {
  try {
    const stories = await fetchStories();
    return {
      paths: stories.map(s => ({ params: { id: s.id } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const stories = await fetchStories();
    const story = stories.find(s => s.id === params.id);
    if (!story) return { notFound: true };
    const content = await fetchStoryContent(params.id);
    return { props: { story, content }, revalidate: 60 };
  } catch {
    return { notFound: true };
  }
}

export default function StoryPage({ story, content }) {
  return (
    <>
      <Head>
        <title>{story.titulo} — Meu Abacate 🥑</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.page}>

        {/* Navbar */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.back}>
            ‹ Histórias
          </Link>
        </nav>

        {/* Capa */}
        {story.capaUrl ? (
          <div className={styles.cover} style={{ backgroundImage: `url(${story.capaUrl})` }}>
            <div className={styles.coverOverlay} />
          </div>
        ) : (
          <div className={styles.coverPlaceholder}>🥑</div>
        )}

        {/* Conteúdo */}
        <article className={styles.article}>
          <header className={styles.header}>
            <h1 className={styles.title}>{story.titulo}</h1>
            {story.descricao && (
              <p className={styles.description}>{story.descricao}</p>
            )}
            <div className={styles.meta}>
              <span className={styles.metaLine} />
              <span className={styles.metaDate}>{formatDate(story.data)}</span>
              <span className={styles.metaLine} />
            </div>
          </header>

          <div className="prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ src, alt }) => {
                  const url = src?.startsWith('http') ? src : `${RAW_BASE}/${story.id}/${src}`;
                  return <img src={url} alt={alt || ''} style={{ width: '100%', borderRadius: '12px', margin: '1.5rem 0' }} />;
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <footer className={styles.footer}>
            <span>🥑</span>
            <p>feito com amor, para sempre meu bem</p>
            <Link href="/" className={styles.backBtn}>
              ← Voltar para as histórias
            </Link>
          </footer>
        </article>
      </div>
    </>
  );
}
