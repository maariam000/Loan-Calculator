//Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  //Hide results
  document.getElementById('results').style.display = 'none';

  //Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault()
});

//Calculate Results function
function calculateResults() {
  console.log('calculating');

  //UI Variables 
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const CalculatedInterest = parseFloat(interest.value) / 100 / 12;
  const CalculatedPayments = parseFloat(years.value) * 12;

  //Compute monthly payment
  const x = Math.pow(1 + CalculatedInterest, CalculatedPayments);
  const monthly = (principal * x * CalculatedInterest) / (x-1);

  if(isFinite(monthly)){
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * CalculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * CalculatedPayments)- principal).toFixed(2);

    //Show result
    document.getElementById('results').style.display = 'block';

    //Hide loader
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your inputs');
  }
}

//Show Error
function showError(error){
  //Hide result
  document.getElementById('results').style.display = 'none';

  //Hide loader
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');

   //Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Add class
  errorDiv.className = 'alert alert-danger';

  //Create textnode and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //Insert Error above heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 seconds
  setTimeout(clearError, 3000);
}

//clear error function
function clearError(){
  document.querySelector('.alert').remove();
}