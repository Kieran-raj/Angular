const setEnv = () => {
  const arg = process.argv.slice(2);
  if (arg.length === 0) {
    throw 'Environment target missing';
  }

  const value = arg[0].split('=')[1];
  const isProduction = value.toLowerCase() === 'prod' ? true : false;

  console.log('Started\n');
  const fs = require('fs');
  const writeFile = fs.writeFile;
  const targetPath = isProduction
    ? './src/environments/environment.prod.ts'
    : './src/environments/environment.ts';

  require('dotenv').config({
    path: 'src/environments/.env'
  });

  const envConfigFile = `
  import { Environment } from './environment-definition';
  
  export const environment: Environment = {
    production: ${isProduction},
    baseUrl: '${process.env['API_SERVER_URL']}',
    domain: '${process.env['AUTH0_DOMAIN']}',
    clientId: '${process.env['AUTH0_CLIENT_ID']}',
    clientSecret: '${process.env['AUTH0_CLIENT_SECRET']}',
    audience: '${process.env['AUHT0_AUDIENCE']}',
    callbackUrl: '${process.env['AUTH0_CALLBACK_URL']}',
    logoutReturnUrl: '${process.env['LOGOUT_RETURN']}' 
  };`;

  console.log('The file `environment.ts` will be written with content: \n');

  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
      console.log(`Finished`);
    }
  });
};

setEnv();
