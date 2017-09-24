if [ -z $1 ]; then
 echo You did\'t key in the log comment;
 exit;
fi
git add .
git commit -m "$1"
git push origin dev
yarn deploy
