import { useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { StatsContainer} from '../../components';

const Stats = () => {
  const { isLoading } = useSelector((store) => store.user);
  if(isLoading){
    return(
      <Wrapper>
        <div>Loading ...</div>
      </Wrapper>
    )
  }
  return (
    <>
      <StatsContainer />
    </>
  );
};
export default Stats;
