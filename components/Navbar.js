import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();

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
          <li className={isActive('/create')}>
            <Link href="/create">
              <a>Create</a>
            </Link>
          </li>
          <li className={isActive('/product')}>
            <Link href="/product">
              <a>Product</a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
