import Head from "next/head";
import Link from "next/link";
import { fetchStories, formatDate, getDaysTogether } from "../lib/github";
import styles from "../styles/Home.module.css";

// =====================================================
// PERSONALIZE AQUI:
// =====================================================
const COUPLE_PHOTO = "https://imgur.com/a/MUfECJt"; // URL da foto de vocês
const ANNIVERSARY = "2022-10-16"; // data do namoro YYYY-MM-DD
// =====================================================

export async function getStaticProps() {
  try {
    const stories = await fetchStories();
    return { props: { stories }, revalidate: 60 };
  } catch {
    return { props: { stories: [], error: true }, revalidate: 30 };
  }
}

export default function Home({ stories, error }) {
  const days = getDaysTogether(ANNIVERSARY);

  return (
    <>
      <Head>
        <title>Meu Abacate 🥑</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        {/* Hero com foto */}
        <section className={styles.hero}>
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${COUPLE_PHOTO})` }}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p className={styles.heroGreeting}>para o meu</p>
            <h1 className={styles.heroName}>Meu Bem 🥑</h1>
            <div className={styles.daysBadge}>
              <span className={styles.daysNum}>{days}</span>
              <span className={styles.daysLabel}>dias juntos</span>
            </div>
          </div>
        </section>

        {/* Divisor */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerEmoji}>🥑</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Seção de histórias */}
        <section className={styles.storiesSection}>
          <h2 className={styles.sectionTitle}>Nossas Histórias</h2>
          <p className={styles.sectionSub}>escritas com todo o meu amor</p>

          {error && (
            <div className={styles.errorBox}>
              <span>🥑</span>
              <p>
                Não foi possível carregar as histórias.
                <br />
                Verifique sua conexão.
              </p>
            </div>
          )}

          {!error && stories.length === 0 && (
            <div className={styles.emptyBox}>
              <span>🥑</span>
              <p>As histórias estão a caminho...</p>
            </div>
          )}

          <div className={styles.grid}>
            {stories.map((story, i) => (
              <Link
                key={story.id}
                href={`/historia/${story.id}`}
                className={styles.card}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {story.capaUrl ? (
                  <div
                    className={styles.cardImg}
                    style={{ backgroundImage: `url(${story.capaUrl})` }}
                  />
                ) : (
                  <div className={styles.cardImgPlaceholder}>🥑</div>
                )}
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{story.titulo}</h3>
                  {story.descricao && (
                    <p className={styles.cardDesc}>{story.descricao}</p>
                  )}
                  <div className={styles.cardFooter}>
                    <span className={styles.cardDate}>
                      {formatDate(story.data)}
                    </span>
                    <span className={styles.cardRead}>Ler →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className={styles.footer}>
          <span>🥑</span>
          <p>feito com amor, para sempre meu bem</p>
        </footer>
      </main>
    </>
  );
}
