import Head from "next/head";
import { gql } from "graphql-request";
import graphQLClient from "../utils/graph-ql-client";
import styles from "../assets/styles/Home.module.css";
import Link from "next/link";

function PageIndex({ listings }) {
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
            <Link key={listing.slug} href={`/listings/${listing.slug}`}>
              <a className={styles.card}>
                <h3>{listing.title} &rarr;</h3>
                <p>Find in-depth information about Next.js features and API.</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
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
