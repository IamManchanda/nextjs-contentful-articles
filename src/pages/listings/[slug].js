import Head from "next/head";
import { gql } from "graphql-request";
import graphQLClient from "../../utils/graph-ql-client";
import styles from "../../assets/styles/Home.module.css";

function PageListingsSlug() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BNB Listings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>BNB Listings</h1>
        <p className={styles.description}>Listing: </p>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await graphQLClient.request(
    gql`
      query GetBnbCollection {
        bnbCollection {
          items {
            slug
          }
        }
      }
    `,
  );
  const listings = data.bnbCollection.items;

  return {
    paths: listings.map((listing) => ({
      params: {
        slug: listing.slug,
      },
    })),
    fallback: false,
  };
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
    props: {},
    revalidate: 3,
  };
}

export default PageListingsSlug;
