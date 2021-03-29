import Head from "next/head";
import Image from "next/image";
import { gql } from "graphql-request";
import graphQLClient from "../../utils/graph-ql-client";
import styles from "../../assets/styles/Home.module.css";

function PageListingsSlug({ listing }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>BNB Listings</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{listing.title}</h1>
        <div className={styles.grid}>
          {listing.photosCollection.items.map((photo) => (
            <div key={photo.sys.id}>
              <p>{photo.title}</p>
              <Image
                className={styles.card}
                src={photo.url}
                alt={photo.title}
                title={photo.title}
                width={photo.width}
                height={photo.height}
              />
              <br />
              <br />
              <hr />
            </div>
          ))}
        </div>
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

export async function getStaticProps({ params }) {
  const data = await graphQLClient.request(
    gql`
      query GetBnbCollection($slug: String!) {
        bnbCollection(where: { slug: $slug }) {
          items {
            title
            photosCollection {
              items {
                sys {
                  id
                }
                title
                url
                width
                height
              }
            }
          }
        }
      }
    `,
    {
      slug: params.slug,
    },
  );

  return {
    props: {
      listing: data.bnbCollection.items[0],
    },
    revalidate: 3,
  };
}

export default PageListingsSlug;
