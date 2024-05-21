import { theme } from '../theme';
import '../theme/fonts.css';
import { getString } from '../utils';

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: theme.colors.ivory,
  fontSize: '4em',
  fontFamily: theme.fonts.amatic,
};

export const Title = () => {
  return <div style={titleStyle}><h1>{getString("title")}</h1></div>
}

export const Birdseye = () => {
  return <div style={titleStyle}><h1>Birdseye</h1></div>
}