# Complete-NodeJS-Coverage
Node JS course work - tutorial and assignments

Personal worspace, you can check and use the examples freely.

## About the keys from APIs - Paypal, Sendgrid
  <ol>
    <li>Create a folder in your root directory called keys</li>
    <li>
      Create a file and name it api_keys.js
      <br/>
      const bus_client_id = 'Ad11EUJKSBJKBCSOK887hhsk';
      const bus_secret = 'EB7-hjahigdasjhyiwb788HHSKS';
      exports.bus_client_id = bus_client_id;
      exports.bus_sandbox_account = bus_sandbox_account;
    </li>
    <li>Import the file to the controller or the file with the middleware you want to use it in. i.e 
    <br/>
      const API_KEYS = require('../keys/api_keys.js');
      const paypalCheckoutSdk = require('@paypal/checkout-server-sdk');
      const paypalHttpClient = new paypalCheckoutSdk.core.PayPalHttpClient(
        new paypalCheckoutSdk.core.SandboxEnvironment(
          paypalKeys.bus_client_id, api_keys.bus_secret
        )
      );
    </li>
   </ol>
