import { theme } from "../theme"
import '../theme/fonts.css';

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  color: theme.colors.ivory,
  textDecoration: 'underline',
  fontSize: 24,
};

export const Title = () => {
  return <div className="amatic-sc-regular" style={titleStyle}><h1>Checkers</h1></div>
}