import { GetStaticProps } from 'next';

import Head from 'next/head';

import { stripe } from '../services/stripe'

import { SubscribeButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

interface IHomeProps {
  product: {
    priceId: string;
    amount: string;
    amountFormatted: string;
  }
}

export default function Home({ product }: IHomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>New about the <span>React</span> world</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amountFormatted} month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KCn5sDLdDHY1jM91hrPBUU1')

  // TRAZ TODOS OS DADOS DO PRODUCT COM O EXPAND
  // const price = await stripe.prices.retrieve('price_1KCn5sDLdDHY1jM91hrPBUU1', {
  //   expand: ['product']
  // })

  const product = {
    priceId: price.id,
    amount: price.unit_amount / 100,
    amountFormatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 60 (minuto) * 60 (hora) * 24 (dia) = 24h
  }
}
