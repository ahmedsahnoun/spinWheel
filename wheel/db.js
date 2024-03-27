
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js'
import { getDatabase, ref, onValue, push as addDB, remove, set } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js'
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js'
import * as se from './streamelements.js';

const urlParams = new URLSearchParams(window.location.search);
const firebaseConfig = JSON.parse(atob(urlParams.get("key")))

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth(app)
signInAnonymously(auth);

// settings listener
onValue(ref(database, "SettingsDB"), (snap) => {
	const snapVal = snap.val()
	//token
	let token = snapVal.token
	token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjaXRhZGVsIiwiZXhwIjoxNzE0MTQxNzEwLCJqdGkiOiJlMDc0YTY5ZC0wYTVhLTQ5ZjktOTQyMC01OWYzZTM3OTBhN2MiLCJjaGFubmVsIjoiNjYwNDJkMGVmZjAwOTAwNWJkNzNhMzhjIiwicm9sZSI6Im93bmVyIiwiYXV0aFRva2VuIjoiU3l4TG42WXdnaUZLNVFEZTJmakxlSXpKTDNYMnIwNW5qYmhxY08yYzZFRlVFR05zIiwidXNlciI6IjY2MDQyZDBlZmYwMDkwMDViZDczYTM4YiIsInVzZXJfaWQiOiIxYjFlM2RlOC1kNWY4LTRmM2MtYjk5YS0xNGE4NjM5NjhlMjQiLCJ1c2VyX3JvbGUiOiJjcmVhdG9yIiwicHJvdmlkZXIiOiJ0d2l0Y2giLCJwcm92aWRlcl9pZCI6IjE2NDQ2NTkxNiIsImNoYW5uZWxfaWQiOiI3OWY5NmMwZC1lZDMxLTQ1MGUtOTA2MS0zYzNkODhmMWIwYWIiLCJjcmVhdG9yX2lkIjoiM2Y3YmNhNmEtMzJiMy00MDk0LTk1OTUtNGIwMDkwN2M1YjUzIn0.1r0Yz8wj9YP2ovtGbwzabjQcRF7A_FAPWALdcHhgTPs"
	se.subscription(token)
})