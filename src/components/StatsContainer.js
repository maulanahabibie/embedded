import StatItem from './StatItem';
import { FaCalendarCheck } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';
import { MySwal } from '../utils';

const sw = new MySwal()
const StatsContainer = () => {
  const { isLoading, userData } = useSelector((store) => store.user);
  const departementId = !isLoading && userData.departementId && userData.departementId.map((d)=>{
    const countEmbed = userData.embeddedId.filter(f=>f.slugDepartement===d.slug);
    return{
      title: d.name,
      count: countEmbed.length || 0,
      icon: <FaCalendarCheck />,
      color: '#DC143C',
      bcg: '#C0C0C0',
    }
  })
  return (
    <Wrapper>
      {!isLoading && departementId
        ? 
          departementId.map((item, index) => {
            return <StatItem key={index} {...item} />
          })
        : <div>Loading ...</div>
      }
    </Wrapper>
  );
};
export default StatsContainer;