# Amandeep Singh Portfolio

Static portfolio site built from the attached CV content. It is ready to deploy on any static host.

## Local preview

Open `index.html` directly in a browser, or run a tiny local server:

```powershell
python -m http.server 4173
```

Then visit `http://127.0.0.1:4173`.

## Deploy with Netlify

1. Create a Git repository for this folder.
2. Push it to GitHub.
3. In Netlify, choose **Add new site > Import an existing project**.
4. Build command: leave empty.
5. Publish directory: `.`.
6. Add custom domains `amndesi.de` and/or `amandesi.in`.

For DNS, point the apex domain to Netlify using their current DNS instructions, or use Netlify DNS. Point `www` with a CNAME to the Netlify site hostname.

## Deploy with Vercel

1. Import the GitHub repository in Vercel.
2. Framework preset: **Other**.
3. Build command: leave empty.
4. Output directory: `.`.
5. Add custom domains `amndesi.de` and/or `amandesi.in`.

For DNS, follow the records Vercel shows after adding each domain. Usually `www` is a CNAME and the apex uses the A record Vercel provides.

## Suggested resume link

```text
Portfolio: https://amandesi.in
```

or

```text
Portfolio: https://amndesi.de
```
