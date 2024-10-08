import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Firebase의 로그인 상태 변화를 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <header className='header'>
      <h1 className='title'>커뮤니티</h1>
      <nav>
        {user ? (
          <>
            <h2>Welcome, {user.email}</h2>
            <button className='btn' onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <button className='btn' onClick={() => navigate('/login')} aria-label="로그인 페이지로 이동">로그인</button>
        )}
      </nav>
    </header>
  )
}
export default Header;