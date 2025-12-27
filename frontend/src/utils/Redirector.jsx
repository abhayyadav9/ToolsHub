import { useParams, useEffect } from "react";

export default function Redirector() {
  const { code } = useParams();

  useEffect(() => {
    window.location.href = `https://toolshub-kg7q.onrender.com/url/${code}`;
  }, [code]);

  return <p>Redirecting…</p>;
}
