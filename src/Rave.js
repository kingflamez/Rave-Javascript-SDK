import axios from 'axios'

export default class Rave {
  constructor() {
    this.PBFPubKey = '';
    this.customer_email = '';
    this.customer_phone = '';
    this.payment_method = 'both';
    this.amount = '';
    this.txref = getReference('rave');
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

  set setPublicKey(PBFPubKey) {
    this.PBFPubKey = PBFPubKey;
  }

  set setEmail(customer_email) {
    this.customer_email = customer_email;
  }

  set setPhone(customer_phone) {
    this.customer_phone = customer_phone;
  }

  set setTransactionReference(txref) {
    this.txref = txref;
  }

  set setAmount(amount) {
    this.amount = amount;
  }

  set setPaymentMethod(payment_method) {
    this.payment_method = payment_method;
  }

  set setCancel(onclose) {
    this.onclose = onclose;
  }

  set setCallback(callback) {
    this.callback = callback;
  }

  set setMeta(meta) {
    this.meta = meta;
  }

  set setCurrency(currency) {
    this.currency = currency;
  };

  set setCountry(country) {
    this.country = country;
  }

  set setRedirectURL(redirect_url) {
    this.redirect_url = redirect_url;
  }

  set setFirstname(customer_firstname) {
    this.customer_firstname = customer_firstname;
  }


  set setLastName(customer_lastname) {
    this.customer_lastname = customer_lastname;
  }

  set setModalTitle(custom_title) {
    this.custom_title = custom_title;
  }

  set setDescription(custom_description) {
    this.custom_description = custom_description;
  }

  set setLogo(custom_logo) {
    this.custom_logo = custom_logo;
  }

  initialize() {
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
  }
}

export function getReference(prefix) {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-+.,";

  for (let i = 0; i < 15; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return prefix + '_' + text;
}


export function RequeryTransaction({ live, txref, SECKEY }) {
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

export function VerifyTransaction({ live, txref, SECKEY }) {
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