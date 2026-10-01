# Byron Naturopathics Resource Centre

A lightweight, static Vite learning site about Alzheimer’s disease, metabolic health and whole-body context.

## Run locally

Run `npm install` followed by `npm run dev` for local development. Run `npm run build` to create the production site in `dist/`; `npm run preview` serves that build locally. The PDF library is on `links.html`; PDF files are hosted under `public/documents/` so their links keep working after deployment.

## Vercel

Import the GitHub repository into Vercel. The project is configured with the Vite framework, `npm run build`, and `dist` as the output directory. The guide bot uses local curated responses and does not need an API key or serverless backend.

## Content notes

- The mind map is an educational visual supplied with the project. Its proposed connections are presented as topics to explore, not as settled medical conclusions.
- The resource page links to the supplied PDFs without reproducing their text. Duplicate PDF variants were consolidated.
- The supplied Alzheimer’s videos are in `public/media/` and embedded on the home page.
- The guide bot has eight local commands: `/help`, `/overview`, `/map`, `/topic <word>`, `/summarise <topic>`, `/videos`, `/pdfs`, and `/quiz`. Its summaries are curated from the site guide; it does not parse or reproduce full PDF contents.
- This resource centre is educational and does not replace individual assessment or treatment advice from a qualified health professional.
