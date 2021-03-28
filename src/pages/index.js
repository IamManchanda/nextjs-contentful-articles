import Head from "next/head";
import { gql } from "graphql-request";
import graphQLClient from "../utils/graph-ql-client";
import styles from "../assets/styles/Home.module.css";

function PageIndex({ listings }) {
  console.log({ listings });
  return (
    <div className={styles.container}>
      <Head>
        <title>BNB Listings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>BNB Listings</h1>

        <div className={styles.grid}>
          {listings.map((listing) => (
            <a
              key={listing.slug}
              href="https://nextjs.org/docs"
              className={styles.card}
            >
              <h3>{listing.title} &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const data = await graphQLClient.request(
    gql`
      query GetBnbCollection {
        bnbCollection {
          items {
            title
            slug
          }
        }
      }
    `,
  );

  return {
    props: {
      listings: data.bnbCollection.items,
    },
    revalidate: 3,
  };
}

export default PageIndex;
