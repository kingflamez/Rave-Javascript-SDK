var axios = require('axios')

function Rave() {
    this.PBFPubKey = '';
    this.customer_email = '';
    this.customer_phone = '';
    this.payment_method = 'both';
    this.amount = '';
    this.txref = generateReference();
    this.onclose = null;
    this.callback = null;
    this.meta = [];
    this.currency = 'NGN';
    this.country = '';
    this.redirect_url = '';
    this.customer_firstname = '';
    this.customer_lastname = '';
    this.custom_title = '';
    this.custom_description = '';
    this.custom_logo = '';
}

Rave.prototype.setPublicKey = function(PBFPubKey) {
    this.PBFPubKey = PBFPubKey;
    return this;
};

Rave.prototype.setEmail = function(customer_email) {
    this.customer_email = customer_email;
    return this;
};

Rave.prototype.setPhone = function(customer_phone) {
    this.customer_phone = customer_phone;
    return this;
};

Rave.prototype.setTransactionReference = function(txref) {
    this.txref = txref;
    return this;
};

Rave.prototype.setAmount = function(amount) {
    this.amount = amount;
    return this;
};

Rave.prototype.setPaymentMethod = function(payment_method) {
    this.payment_method = payment_method;
    return this;
};

Rave.prototype.setCancel = function(onclose) {
    this.onclose = onclose;
    return this;
};

Rave.prototype.setCallback = function(callback) {
    this.callback = callback;
    return this;
};

Rave.prototype.setMeta = function(meta) {
    this.meta = meta;
    return this;
};

Rave.prototype.setCurrency = function(currency) {
    this.currency = currency;
    return this;
};

Rave.prototype.setCountry = function(country) {
    this.country = country;
    return this;
};

Rave.prototype.setRedirectURL = function(redirect_url) {
    this.redirect_url = redirect_url;
    return this;
};

Rave.prototype.setFirstname = function(customer_firstname) {
    this.customer_firstname = customer_firstname;
    return this;
};

Rave.prototype.setLastName = function(customer_lastname) {
    this.customer_lastname = customer_lastname;
    return this;
};

Rave.prototype.setModalTitle = function(custom_title) {
    this.custom_title = custom_title;
    return this;
};

Rave.prototype.setDescription = function(custom_description) {
    this.custom_description = custom_description;
    return this;
};

Rave.prototype.setLogo = function(custom_logo) {
    this.custom_logo = custom_logo;
    return this;
};

Rave.prototype.initialize = function(){
	window.getpaidSetup({
      customer_email: this.customer_email,
      customer_phone: this.customer_phone,
      payment_method: this.payment_method,
      amount: this.amount,
      txref: this.txref,
      PBFPubKey: this.PBFPubKey,
      onclose: () => this.onclose(),
      callback: response => this.callback(response),
      meta: this.meta,
      currency: this.currency,
      country: this.country,
      redirect_url: this.redirect_url,
      customer_firstname: this.customer_firstname,
      customer_lastname: this.customer_lastname,
      custom_title: this.custom_title,
      custom_description: this.custom_description,
      custom_logo: this.custom_logo
    })
};


function generateReference() {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-+.,";

  for (let i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return 'rave_' + text;
}

function RequeryTransaction({ live, txref, SECKEY }) {
  var url = 'http://flw-pms-dev.eu-west-1.elasticbeanstalk.com'
  if (live) {
    url = 'https://api.ravepay.co'
  }

  return axios.post(`${url}/flwv3-pug/getpaidx/api/xrequery`, {
    txref, SECKEY, last_attempt: 1
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error;
    });
}

function VerifyTransaction({ live, txref, SECKEY }) {
  var url = 'http://flw-pms-dev.eu-west-1.elasticbeanstalk.com'
  if (live) {
    url = 'https://api.ravepay.co'
  }

  return axios.post(`${url}/flwv3-pug/getpaidx/api/verify`, {

    tx_ref: txref,
    SECKEY: SECKEY,
    normalize: 1

  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      throw error;
    });
}


module.exports = {
    Rave, 
    VerifyTransaction,
    RequeryTransaction
};
