# chatApp
A simple chat application with laravel and vuejs
## Installing and configure
At the first clone repository or download it then open command line in that folder then enter this code:
```
copy .env.example .env
```
then run this:
```
composer install
```
after all this go to [Pusher](https://pusher.com) and sign up or if you have account log in then create new app
for name section enter "chatApp" and for the cluster enter "eu" then create and set then go to App-keys tab and just copy values from there to
.env file
after all of this create a new database and configure it in .env file after doing this enter command below
```
php artisan migrate
```
if you have any problem with application or UI run this command 
```
npm install
```
Good Luck :)