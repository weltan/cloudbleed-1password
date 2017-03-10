# cloudbleed-1password
Export your 1Password URLs, and see which of them are affected by [Cloudbleed](https://bugs.chromium.org/p/project-zero/issues/detail?id=1139)!

# Requirements

Either Node.js 6.7 or later or Docker. You can check the version of Node you have installed by running `node -v`.

# Instructions (Node)

1. Clone the repo.
2. From 1Password desktop, go to File>Export>All Items….  **If Export is greyed out, select a single vault (you likely have All Vaults selected).**
3. Select file format CSV.
4. Remove all columns except for the 'URL' column. This way, your passwords won't be exported along with the list of sites.
5. Name the file affectedSites.csv and export, saving it in the cloudbleed-1password folder.
6. Inside the cloudbleed-1password folder, run `npm install`.
7. Run `node index.js`

# Instructions (Docker)

1. Follow steps 1-5 from above.
2. Build a container: `docker build . -t cloudbleed`
3. Run the container: `docker run -it cloudbleed`

# Contribute

Please do!
