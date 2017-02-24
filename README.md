# cloudbleed-1password
export your 1Password URLS, and see which of them are affected by cloudbleed! (https://bugs.chromium.org/p/project-zero/issues/detail?id=1139)

# Requirements
1. You will either need `node` and `npm`, or docker installed to do this. 
2. If you aren't using `docker`, you'll need at least node v6.7 to use. You can check by typing `node -v`.

# Instructions (with node installed)
1. Go to a directory where you want to place this project, and type `git clone https://github.com/weltan/cloudbleed-1password.git`.
2. go to 1Password Desktop -> Export -> All items.  **if Export is greyed out select a single vault (you likely have All Vaults selected)**
3. Name your export file `affectedSites.csv`
4. Select file format CSV.
5. You do NOT need to export your passwords: remove all columns except for the 'URL' column.
6. Once exported, move `affectedSites.csv` into the cloudbleed-1password folder.
7. Inside the cloudbleed-1password folder, run `npm install`.
8. Run `node index.js`

# Contribute

Please do!

# Use a docker container (with docker installed)
For those not willing/able to run nodejs.

1. Follow steps 1-5
2. Build a container `docker build . -t cloudbleed`
3. Run the container `docker run -it cloudbleed`
