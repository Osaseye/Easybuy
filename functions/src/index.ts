import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const setRoleClaim = functions.firestore
    .document('users/{userId}')
    .onCreate(async (snap, context) => {
        const data = snap.data();
        if (data && data.role) {
            await admin.auth().setCustomUserClaims(context.params.userId, { role: data.role });
        }
    });
