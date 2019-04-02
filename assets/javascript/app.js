// Initialize Firebase
const config = {
    apiKey: "AIzaSyDQDZaxvlRDnpOTfUcmSgZlxrukX_yNU6k",
    authDomain: "train-schedule-4bd64.firebaseapp.com",
    databaseURL: "https://train-schedule-4bd64.firebaseio.com",
    projectId: "train-schedule-4bd64",
    storageBucket: "",
    messagingSenderId: "236143229273"
  }

  firebase.initializeApp(config)

//   Variable to reference our database
let db = firebase.firestore()

// Variable for our onClick event listener 
  var name; 
  var destination; 
  var firstTrain; 
  var frequency = 0; 

  document.querySelector('submit').addEventListener('click', e => {
    event.preventDefault(); 
    // getting a unique identifier for the train input submissions 
    let id = db.collection('trainSubmission').doc().id
    // pushing unique id to .doc()
    db.collection('trainSubmission').doc(id).set({
      name: document.querySelector('#train-name').value,
      destination: document.querySelector('#destination').value,
      firstTrain: document.querySelector('#first-train').value,
      frequency: document.querySelector('#frequency').value,
    })
    // restart the values by setting them to emptry strings 
    document.querySelector('#train-name').value = ''
    document.querySelector('#first-train').value = ''
    document.querySelector('#frequency').value = ''
  })

  // function addTrain() {
  //   var name = document.getElementById('train-name').value
  //   var destination = document.getElementById('destination').value
  //   var firstTrain = document.getElementById('first-train').value
  //   var frequency = document.getElementById('frequency').value

  //   var newTrainKey = database.ref().child('newTrain').push().key
  //   database.ref('newTrain/' + newTrainKey + '/name').set(name)
  //   database.ref('newTrain/' + newTrainKey + '/destination').set(destination)
  //   database.ref('newTrain/' + newTrainKey + '/first-train').set(firstTrain)
  //   database.ref('newTrain/' + newTrainKey + '/frequency').set(frequency)
  // }

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val())

    // store variables 
    var trainName = childSnapshot.val().train
		var destination =childSnapshot.val().destination
		var firstTime = childSnapshot.val().firstTrain
    var frequency = childSnapshot.val().frequency
    
    console.log(trainName)
		console.log(destination)
		console.log(firstTime)
		console.log(frequency)

    //makes first train time neater
    var trainTime = moment.unix(firstTime).format("hh:mm");
    
		//calculate difference between times
		var difference =  moment().diff(moment(trainTime),"minutes");

		//time apart(remainder)
		var trainRemain = difference % frequency;

		//minutes until arrival
		var minUntil = frequency - trainRemain;

		//next arrival time
		var nextArrival = moment().add(minUntil, "minutes").format('hh:mm');

    // adding into to the DOM table with <tr><td>
    document.querySelector('#add-row').append("<tr><td>" + childSnapshot.value().name +
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +
    "</td><td>" + nextTrain + 
    "</td><td>" + minAway + "</td></tr>");
  });