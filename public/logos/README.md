# Logo assets — sources and licences

These are the marks that are **not** available in the `simple-icons` package used
for the rest of the tech-stack icons. Each file was trimmed, squared onto a
transparent 128×128 canvas, and committed as PNG.

| File | Mark | Source | Licence / status |
|---|---|---|---|
| `vscode.png` | Visual Studio Code | `devicons/devicon` — `icons/vscode/vscode-original.svg` | **MIT** (devicon) |
| `excel.png` | Microsoft Excel | Wikimedia Commons — `Microsoft Excel 2013-2019 logo.svg` | **Public domain** (per the file's Commons metadata) |
| `c.png` | C | URL supplied by the site owner, white background removed | ⚠️ **unverified** — see below |
| `hermes.png` | Hermes Agent | `hermes-agent.nousresearch.com/docs/img/logo.png`, trimmed and squared | ⚠️ **unverified** — see below |

## Unverified marks

The remaining marks below are **not** covered by a permissive licence that could be
confirmed:

- **C** — the source URL did not carry licence information. The C language is
  specified by ISO/IEC 9899; the logo is widely reproduced but its ownership is
  not established here.
- ~~**MySQL dolphin**~~ — **removed.** The MySQL entry was dropped from the skill
  list because "SQL & Relational DB" already covers it, so the mark is no longer
  used. It was an Oracle trademark rather than a free licence; the asset has
  been deleted from this folder.
- **Hermes Agent** — no licence statement was found on the source page.

If the site is ever used commercially, or if a takedown request arrives, replace
these three with neutral alternatives. `simple-icons` (CC0 1.0) has permissive
stand-ins for most of them — for example `PostgreSQL` for a database mark, or a
monogram plate, which is what the component renders when no image is supplied.

## Regenerating

`scripts/generate-tech-icons.mjs` regenerates the `simple-icons` set in
`src/components/ui/TechIcon.tsx`. The raster marks in this folder are produced
separately; the processing steps were: trim to content, centre on a square
canvas with ~6% padding, resize to 128×128, save as optimised PNG with an alpha
channel.
