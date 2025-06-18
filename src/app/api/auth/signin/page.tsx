export default function SignIn() {
  return (
    <form action="/api/auth/callback/credentials" method="post">
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}