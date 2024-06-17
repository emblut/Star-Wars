const obiButton = document.querySelector('.obiButton');
const textInput = document.querySelector('.textInput');
const searchButton = document.querySelector('.searchButton');
const output = document.querySelector('.output');

async function getObiInfo() {
  const baseUrl = 'https://swapi.dev/api/people/';
  const result = await fetch(baseUrl);
  let data = await result.json();
  data = data.results[9];
  output.innerText = `
  ${data.name} is a ${data.gender} who was born ${data.birth_year}. His haircolor is ${data.hair_color} and his eyecolor is ${data.eye_color}. He weights ${data.mass}kg and is ${data.height}cm tall.
  `;
  let newImg = document.createElement('img');
  newImg.classList.add('obi-wan-img');
  newImg.src = '/starwars/obi.png';
  obiButton.innerText = '';
  obiButton.append(newImg);
}

async function getPersonInfo() {
  const baseUrl = 'https://swapi.dev/api/people/?search=';
  let textValue = textInput.value;
  let person = '';
  let pronounce1 = '';
  let pronounce2 = '';
  const result = await fetch(baseUrl + textValue);
  let data = await result.json();
  data = data.results;
  console.log(data);

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      if (textValue == data[i].name) {
        person = data[i];
        console.log(person);
        if (person.gender == 'male') {
          pronounce1 = 'He';
          pronounce2 = 'His';
        } else if (person.gender == 'female') {
          pronounce1 = 'She';
          pronounce2 = 'Her';
        } else if (person.gender == 'unknown') {
          pronounce1 = 'They';
          pronounce2 = 'Their';
        } else if (person.gender == 'n/a') {
          person.gender = 'creature';
          pronounce1 = 'They';
          pronounce2 = 'Their';
          person.hair_color = 'none';
        }
        output.innerText = `
        ${person.name} is a ${person.gender} who was born ${
          person.birth_year
        }. ${pronounce2} haircolor is ${
          person.hair_color
        } and ${pronounce2.toLowerCase()} eyecolor is ${
          person.eye_color
        }. ${pronounce1} weights ${person.mass}kg and is ${
          person.height
        }cm tall.
      `;
      } else {
        output.innerText = "Sorry I didn't quite understand that. Try again!";
      }
    }
  } else {
    output.innerText = "Sorry I didn't quite understand that. Try again!";
  }
}
obiButton.addEventListener('click', getObiInfo);
searchButton.addEventListener('click', getPersonInfo);
