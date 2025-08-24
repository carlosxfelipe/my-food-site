import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-project</title>
        <link rel="stylesheet" href="/styles.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Icons&family=Material+Icons+Outlined&display=swap"
          rel="stylesheet"
        />
        <script
          type="module"
          src="https://unpkg.com/ionicons@6/dist/ionicons/ionicons.esm.js"
        >
        </script>
        <script
          nomodule
          src="https://unpkg.com/ionicons@6/dist/ionicons/ionicons.js"
        >
        </script>
      </head>
      <body class="min-h-screen flex flex-col">
        <Component />
      </body>
    </html>
  );
}
