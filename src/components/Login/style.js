import background from '../../images/login-background.jpg';

const styles = (theme) => ({
   primaryColor: {
     backgroundColor: 'rgba(255, 255, 255, 0.02)'
   },
  'blur-back': {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    'background': `url(${background})`,
    'background-size': 'cover',
    transform:'scale(1.1)',
    filter: 'blur(10px)',
    zIndex: -1
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
  footer: {
    position: 'absolute',
    height: 100,
    bottom: 0,
    width: '100%',
    color: '#9E9E9E',
    'background-color': 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    zIndex: 10
  },
  'login-wrapper': {
    flex: '1 1 100%',
    display: 'flex',
    position:'relative',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    'background-color': `rgba(179, 229, 252, 0.1)`,
    fontSize: '1rem',
    zIndex: 5,
  },
  formControl: {
    height: 50,
    margin: '15px auto',
  },
  'home-icon': {
    position:'relative',
    fontSize: '2.5rem',
    verticalAlign:'sub',
  },
  form: {
    display:'flex',
    position:'relative',
    top: '-10%',
    width: 300,
    height: 500,
    alignItems: 'start',
    // background: cyan[50],
    borderRadius: 5,
    '& h1': {
      textAlign: 'center',
      fontWeight: 500
    },
  }
})

export default styles;
