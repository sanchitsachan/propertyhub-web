export const dynamic = "force-dynamic";

export default async function HomePage() {
  try {
    const res = await fetch(
      "https://projects.sanchitsachan.com/api/v1/properties",
      { cache: "no-store" }
    );

    const data = await res.json();

    return (
      <main style={{ padding: 20 }}>
        <h1>API WORKING ✅</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>
    );
  } catch (e: any) {
    return (
      <main>
        <h1>ERROR ❌</h1>
        <p>{e.message}</p>
      </main>
    );
  }
}

