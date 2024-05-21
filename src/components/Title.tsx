import { theme } from '../theme';
import '../theme/fonts.css';
import { getString } from '../utils';

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: theme.colors.ivory,
  textDecoration: 'underline',
  fontSize: 24,
  fontFamily: theme.fonts.amatic,
};

export const Title = () => {
  return <div style={titleStyle}><h1>{getString("title")}</h1></div>
}