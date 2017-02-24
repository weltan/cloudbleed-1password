# cloudbleed-1password
export your 1Password URLS, and see which of them are affected by cloudbleed! (https://bugs.chromium.org/p/project-zero/issues/detail?id=1139)

# To run

1. `git clone` this repo.
2. go to 1Password, Export, as a CSV, all items. 
3. name it `affectedSites.csv`
4. do NOT export your passwords: you only need a CSV of the 'URL' column.
5. move `affectedSites.csv` to this repo.
6. Inside this repo, run `npm install`
7. run `node index.js`

# Contribute

Please do!

# Use a docker container
For those not willing/able to run nodejs.

1. Follow steps 1-5
2. Build a container `docker build . -t cloudbleed`
3. Run the container `docker run -it cloudbleed`