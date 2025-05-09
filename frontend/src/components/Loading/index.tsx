import { BounceLoader } from 'react-spinners';
import './loading.scss';

type LoadingProps = {
  loadingText: string;
};

const Loading = ({ loadingText }: LoadingProps) => {
  return (
    <div className='loading-container'>
      <BounceLoader size={100} color='#64748b' />
      <p>{loadingText}</p>
    </div>
  );
};

export default Loading;
