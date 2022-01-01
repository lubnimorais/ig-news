import styles from './styles.module.scss';

interface ISubscripeButtonProps {
  priceId: string;
}

const SubscribeButton = ({ priceId }: ISubscripeButtonProps) => {
  return (
    <button
      type='button'
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  )
}

export { SubscribeButton }