var firebaseConfig = {
    apiKey: "AIzaSyBgmZurBDywcfLVQmU_bO488lV9oqd9Ac0",
    authDomain: "corona-testing-centres.firebaseapp.com",
    databaseURL: "https://corona-testing-centres-default-rtdb.firebaseio.com",
    projectId: "corona-testing-centres",
    storageBucket: "corona-testing-centres.appspot.com",
    messagingSenderId: "876727391704",
    appId: "1:876727391704:web:639397261e38c715ee4ead"
  };
  firebase.initializeApp(firebaseConfig);
  var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testForm').addEventListener('submit',submitForm);
  function submitForm(e){
    e.preventDefault();
    var fname = getInputVal("firstname");
    var lname = getInputVal("lastname");
    var mobile = getInputVal("mobile");
    var occupation = getInputVal("profession");
    var email = getInputVal("email");
    var emailstatus=validateEmail();
    var dateofbirth = getInputVal("dateofbirth");
    var state = getInputVal("state");
    state=state.toLowerCase();
    readState(state);
    var symptomsList =getSelectedCheckboxValues('symptoms');
    var selectedOption = document.querySelector('input[name = option]:checked').value;
    if(emailstatus)
    saveMessages(lname+ " " +fname,mobile,email,occupation,dateofbirth,state,selectedOption,symptomsList);
  }
  function readState(state){
      var centers;
      var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>"+centers;
    })
  }
  function getInputVal(id){
      return document.getElementById(id).value;
  }
  function saveMessages(name,mobile,email,occupation,dateofbirth,state,selectedOption,symptomsList){
      var newuserInputsRef = UserInputsRef.push();
      newuserInputsRef.set({
        name:name,
        mobile:mobile,
        email:email,
        occupation:occupation,
        dateofbirth:dateofbirth,
        selectedOption:selectedOption,
        state:state, 
        symptomsList:symptomsList
      })
      alert("Your data was saved successfully.");
  }
  function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function validateEmail() 
{
 if (/^[a-zA-Z0-9.!#$%&'+*/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

