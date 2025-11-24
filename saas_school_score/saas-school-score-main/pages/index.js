import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Welcome to SaaS School Score</h1>
      <p>
        <Link href="/login">Go to Login</Link>
      </p>
    </div>
  );
}
