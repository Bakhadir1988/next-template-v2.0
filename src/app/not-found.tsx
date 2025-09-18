import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '50px',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
}
