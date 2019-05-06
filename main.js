var length = document.getElementById("length")
var complexity = document.getElementsByName("complexity")
var result = document.getElementById('result');
var previous = document.getElementById('previous')

var passwords = [];
if(window.localStorage.getItem("passwords") != null)
{
  passwords = JSON.parse(window.localStorage.getItem("passwords"));
}

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
letters = ['a', 'b' ,'c' ,'d' ,'e' ,'f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
symbols = ['!', '@', '#', '$', '%']

render();

function getNumberInRange(min, max)
{
  var minimum = Math.ceil(min);
  var maximum = Math.floor(max);

  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

function getRandomCharacter(array)
{
  var index = Math.floor(Math.random() * array.length);
  var char = array[index];
  return char;
}

function render()
{
  previous.innerText = "";
  var localPasswords = JSON.parse(window.localStorage.getItem("passwords"));
  for(var i = 0; i < localPasswords.length; i++)
  {
    previous.innerHTML += "<li>" + localPasswords[i] + "</li>";
  }

  console.log(window.localStorage.getItem("passwords"))
}

function generate()
{
  var password = "";
  var outputLength = length.value;
  var complexityValue = 1;

  for(var i = 0; i < complexity.length; i++)
  {
    if(complexity[i].checked)
    {
      complexityValue = complexity[i].value
    }
  }

  for(var i = 0; i < outputLength; i++)
  {
    var charToAdd = "x";
    var chooseCharacter = getNumberInRange(1, complexityValue);

    console.log(chooseCharacter)

    if(chooseCharacter == 1)
    {
      charToAdd = getRandomCharacter(letters)
    }
    else if(chooseCharacter == 2)
    {
      charToAdd = getRandomCharacter(numbers)
    }
    else if(chooseCharacter == 3)
    {
      charToAdd = getRandomCharacter(symbols)
    }

    password += charToAdd
  }

  passwords.push(password);
  window.localStorage.setItem("passwords", JSON.stringify(passwords));

  render();

  return password;
}

function onClearPrevious()
{
  passwords = [];
  window.localStorage.setItem("passwords", JSON.stringify(passwords));
  render();
}

function onClick()
{
  var password = generate();
  result.innerText = password;
}
