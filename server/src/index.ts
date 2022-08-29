import {server, logRoutes} from './app';
import { mongoConnect } from './config/database';


const PORT = process.env['PORT'] || 3000;




mongoConnect().then(() =>{
    server.listen(PORT, () =>{
        console.log(`Server is Running on http://localhost:${PORT}`);
        logRoutes();
    })
})
