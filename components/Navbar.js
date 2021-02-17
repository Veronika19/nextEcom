import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { parseCookies, destroyCookie } from 'nookies';

/** Note: for logging out I have used javascript instead of router.push as,
 * using push the layout header
 * menu section were not hiding the login and register menu
 * */

const Navbar = () => {
  const router = useRouter();
  const { token } = parseCookies();
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (token) {
      setUser(true);
    }
  }, [user]);

  const isActive = (route) => {
    if (route == router.pathname) {
      return 'active';
    } else '';
  };

  return (
    <nav>
      <div className="nav-wrapper #f4511e deep-orange darken-1">
        <Link href="/">
          <a className="brand-logo">Logo</a>
        </Link>

        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user ? (
            <>
              <li className={isActive('/create')}>
                <Link href="/create">
                  <a>Create</a>
                </Link>
              </li>
              <li>
                <button
                  className="btn"
                  onClick={() => {
                    destroyCookie(null, 'token');
                    setUser(false);
                    window.location.assign('/login');
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={isActive('/login')}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className={isActive('/signup')}>
                <Link href="/signup">
                  <a>Register</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
