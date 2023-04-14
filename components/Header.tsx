import classes from '../styles/header.module.css'

function Header(props:any) {
    const handleLogout = () => {
      localStorage.setItem('isLoggedin','false')
      props.router.push('/login')
    };
  
    return (
      <header className={classes.header}>
        <h1 className={classes.h1}>User Dashboard</h1>
        <button className={classes.button} onClick={handleLogout}>Logout</button>
      </header>
    );
  }
export default Header