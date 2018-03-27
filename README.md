# Rave-Javascript-SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![npm version](https://badge.fury.io/js/rave-javascript-sdk.svg)](https://badge.fury.io/js/rave-javascript-sdk)

> Implement Rave by Flutterwave easily with Javascript frameworks and Libraries

- Go to [Flutterwave Rave Live](https://rave.flutterwave.com) to get your **`LIVE`** public and private key
- Go to [Flutterwave Rave Test](https://raveappv2.herokuapp.com) to get your **`TEST`** public and private key

## Tested on
- VueJS
- NuxtJS
- ReactJS

## Installation
```bash
npm install rave-javascript-sdk --save
```

Add this Rave Inline Script to your `index.html` for a testing account
```html
<script src="https://rave-api-v2.herokuapp.com/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
```

Add this Rave Inline Script to your `index.html` for a live account
```html
<script src="https://api.ravepay.co/flwv3-pug/getpaidx/api/flwpbf-inline.js"></script>
```

## Basic Usage

### VueJS Sample

```html
  <template>
    <button v-on:click="buy">Buy</button>
  </template>
  <script>
  import Rave from 'rave-javascript-sdk'
  export default {
    methods: {
      buy() {
        var rave = new Rave();
        
        rave.setEmail='test@test.com'
        rave.setAmount="3000"
        rave.setPublicKey="FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X"
        rave.setModalTitle="Flamez Store"
        rave.setMeta = [
                        { metaname: 'Room', metavalue: "36A" },
                        { metaname: 'Colour', metavalue: "Blue" }
                      ]
        rave.initialize()
      }
    }
  }
  </script>
```

### ReactJS Sample

```javascript
import React, { Component } from 'react';
import Rave from 'rave-javascript-sdk';

class Events extends Component {
  constructor(props) {
    super(props);
    this.buy = this.buy.bind(this);
  }

  buy() {
    var rave = new Rave();
    
    rave.setEmail='flamekeed@gmail.com'
    rave.setAmount="3000"
    rave.setPublicKey="FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X"
    rave.setModalTitle="Flamez Store"
    rave.setMeta = [
                    { metaname: 'Room', metavalue: "36A" },
                    { metaname: 'Colour', metavalue: "Blue" }
                   ]
    rave.initialize()
  }

  render() {
    return (
      <div>
          <button onClick={this.buy}>Buy</button>
      </div>
    )
  }
}
```

## Available Rave methods
| Name               | Type         | Default  | Required | Description |
| ------------------ | ------------ | -------- | -------- | ----------- |
| setPaymentMethod     | String       | `both`   | No       | This allows you select the payment option you want for your users, this can be `both`, `card`, `ussd` or `account`. |
| setMeta           | Object Array | `[{}]`     | No       | These are additional information you want to pass through the payment gateway .|
| setCurrency           | String       | `NGN`    | No       | The currency you want to charge the customer. |
| setRedirectURL       | String       |          | No       | URL to redirect to when transaction is completed. |
| setCountry            | String       | `NG`     | No       | The country of operation. |
| setFirstname | String       |          | No       | First name of the customer. |
| setLastName  | String       |          | No       | Last name of the customer. |
| setModalTitle       | String       |          | No       | Text to be displayed as the title of the payment modal. |
| setDescription | String       |          | No       | Text to be displayed as a short modal description. |
| setLogo        | String       |          | No       | Link to the Logo image. |
| setTransactionReference              | String | It will be generated automatically when left blank | No | Unique transaction reference provided by the merchant. |
| setEmail     | String       |          | Yes       | Email of the customer. |
| setPhone     | String       |          | No       | Phone number of the customer. |
| setAmount             | String       |          | Yes       | Amount to charge. |
| setPublicKey         | String       |          | Yes       | Your merchant public key provided when you sign up for rave. |
| setCallback           | Function     |          | No      | A function to be called on successful card charge. User’s can always be redirected to a successful or failed page supplied by the merchant here based on response. |
| setCancel            | Function     |          | No      | A function to be called when the pay modal is closed. |

## Available Functions
1. `RequeryTransaction({ live, txref, SECKEY })`

> This requeries a transaction, useful to check if a failed transaction is successful

- `live`: `false` or `true` Set to true if you are using a live account and vice versa
- `txref`: The transaction reference
-  `SECKEY`: Your API secret key

```javascript
RequeryTransaction({ live: false, txref: response.tx.txRef, SECKEY: "FLWSECK-XXXXXXXXXXXXXXXXXXXXXXXXXXXX-X" })
.then(function (resp) {
  // console.log(resp);
})
.catch(function (error) {
  // console.log(error);
});
```

2. `VerifyTransaction({ live, txref, SECKEY })`

> This validates a transaction, you can get your metas passed through this

- `live`: `false` or `true` Set to true if you are using a live account and vice versa
- `txref`: The transaction reference
-  `SECKEY`: Your API secret key

```javascript

var currency = "NGN"; //Gotten from server or hardcoded
var amount = "3000"; //Gotten from server or hardcoded

VerifyTransaction({ live: false, txref: response.tx.txRef, SECKEY: "FLWSECK-XXXXXXXXXXXXXXXXXXXXXXXXXXXX-X" })
.then(function (resp) {
  // console.log(resp);
  var chargeResponse = resp.data.data.flwMeta.chargeResponse;
  var chargeAmount = resp.data.data.amount;
  var chargeCurrency = resp.data.data.transaction_currency;


  if ((chargeResponse == "00" || chargeResponse == "0") && (chargeAmount == amount) && (chargeCurrency == currency)) {
    console.log("Successful");
    
    console.log(resp.data);
    
    //Give Value and return to Success page
  } else {
    console.log("Error");
    console.log(resp);
    
    
    //Dont Give Value and return to Failure page
  }
})
.catch(function (error) {
  // console.log(error);
});
```


## More Samples

### VueJS with Transaction Verification


```html
  <template>
    <button v-on:click="buy">Buy</button>
  </template>
  <script>
  import Rave from 'rave-javascript-sdk'
  export default {
    methods: {
      buy() {
        var rave = new Rave();
        
        rave.setEmail='flamekeed@gmail.com'
        rave.setAmount="3000"
        rave.setPublicKey="FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X"
        rave.setModalTitle="Flamez fresh"
        rave.setCancel=this.cancel
        rave.setCallback = this.callback
        rave.setMeta = [
                        { metaname: 'Room', metavalue: "36A" },
                        { metaname: 'Colour', metavalue: "Blue" }
                      ]
        rave.initialize()
      },
      callback(resp) {
        return VerifyTransaction({ live: false, txref: resp.tx.txRef, SECKEY: "FLWSECK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X" })
          .then(function (response) {
            console.log(response);
            ;
          })
          .catch(function (error) {
            console.log(error);

          });
      },
      cancel() {
        console.log("closed"); 
      }
    }
    }
  }
  </script>
```

### ReactJS with Transaction Verification

```javascript
import React, { Component } from 'react';
import Rave, { VerifyTransaction } from 'rave-javascript-sdk';

class Events extends Component {
  constructor(props) {
    super(props);
    this.buy = this.buy.bind(this);
  }

  buy() {
    var rave = new Rave();
    
    rave.setEmail='flamekeed@gmail.com'
    rave.setAmount="3000"
    rave.setPublicKey="FLWPUBK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X"
    rave.setModalTitle="Flamez Store"
    rave.setCancel=this.cancel
    rave.setCallback = this.callback
    rave.setMeta = [
                    { metaname: 'Room', metavalue: "36A" },
                    { metaname: 'Colour', metavalue: "Blue" }
                   ]
    rave.initialize()
  }


  callback(resp) {
    return VerifyTransaction({ live: false, txref: resp.tx.txRef, SECKEY: "FLWSECK-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-X" })
      .then(function (response) {
        console.log(response);
        ;
      })
      .catch(function (error) {
        console.log(error);

      });
  }

  cancel() {
    console.log("closed");
  }

  render() {
    return (
      <div>
          <button onClick={this.buy}>Buy</button>
      </div>
    )
  }
}
```


## Contributing
Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

Kindly star the GitHub repo and share ❤️.  I ❤️ Flutterwave

Kindly [follow me on twitter](https://twitter.com/mrflamez_)!

## Credits

- [Oluwole Adebiyi (KingFlamez)](https://github.com/kingflamez)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.