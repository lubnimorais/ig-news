import { useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';

import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';

import styles from './styles.module.scss';


interface ISubscripeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubscripeButtonProps) => {
  const { data: session} = useSession();

  const handleSubscribe = useCallback(async () => {
    if (!session) {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJS()
      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message)
    }
  }, [session])

  return (
    <button
      type='button'
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  )
}

export { SubscribeButton }