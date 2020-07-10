
## Setting up for development
* create a file named .env which should contain the following default setup:
```
SALT=35kj7waj3k5kja09jeoi21kn0pg13iuhlkn // used in password hashing
JWT_SECRET=secret        // used in JWT signing
SESSION_SECRET=secret    // used for session data
PORT=3000                // the port on which your server will be available on
SERVER_ADDRESS=127.0.0.1 // or 0.0.0.0 for all or other interface address you want to listen
```

<br />

## Scripts
**Install Modules**
```bash
$ npm i
$ npm i nodemon -g 
```

<br />

**Run**
```bash
$ npm run start # classic start OR
$ npm run dev # with nodemon live update  
```
Runs the application with [nodemon]("https://nodemon.io/"). Server is listening on Port 3000 by default. This can be overwritten by `PORT` constant in `.env` file. 

<br />
142.93.53.238
Salsadetomate0124Especial
GRANT ALL ON vet_db.* TO vet@'142.93.53.238' IDENTIFIED BY 'root';

update db set Host='142.93.53.238' where Db='vet_db';



CREATE USER 'vet_user'@'localhost' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON veterinary.* TO 'vet_user'@'localhost';

UPDATE mysql.user SET HOST='%' WHERE User='vet';

REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'vet'@'localhost';
DROP USER 'vet'@'localhost';