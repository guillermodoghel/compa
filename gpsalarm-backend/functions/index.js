/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch(e) {
    res.status(403).send('Unauthorized');
    return;
  }
};

app.use(authenticate);


app.post('/location', async (req, res) => {
  try {
    await admin.database().ref(`/users/${req.user.uid}/metadata`).set(req.user);
    await req.body.map(async (item) => {
      item.ip=req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await admin.database().ref(`/users/${req.user.uid}/tracks/${item.trackid}`).push(item);
    })
    res.sendStatus(200)
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.sendStatus(500);
  }
});

app.post('/sync', async (req, res) => {
  try {
    await admin.database().ref(`/users/${req.user.uid}/metadata`).set(req.user);
    await req.body.map(async (item) => {
      item.ip=req.connection.remoteAddress;
      await admin.database().ref(`/users/${req.user.uid}/tracks/${item.trackid}`).push(item);
    })
    res.sendStatus(200)
  } catch(error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.sendStatus(500);
  }
});


exports.api = functions.https.onRequest(app);
