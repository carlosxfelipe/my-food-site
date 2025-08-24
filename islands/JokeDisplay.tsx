import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

export default function JokeDisplay() {
  const [joke, setJoke] = useState("");

  const fetchJoke = async () => {
    const res = await fetch("/api/joke");
    const text = await res.text();
    setJoke(text);
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div class="my-6">
      <p class="italic mb-2">"{joke}"</p>
      <Button onClick={fetchJoke} class="mt-2">
        Nova piada
      </Button>
    </div>
  );
}
