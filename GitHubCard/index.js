/* [✅] Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/stompke')
.then(response => {

  cards.appendChild(CreateCard(response))
  console.log(response);



})
.catch(err => {
  console.log(`your error is: ${err}`);
});

/* [✅] Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* [✅] Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/


// cards.appendChild(CreateCard(myData));


/* [✅] Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/



// const followersArray = ['twitecki', 'debauchery1st', 'jengopockets', 'KonstadinosAngelis', 'Adammonast'];
let followersArray = [];


axios.get('https://api.github.com/users/stompke/following')
.then(response => {
 
    // const keys = Object.keys(response)
    // console.log(response)
    response.data.forEach(item => {

      const userUrl = item.url;

      axios.get(userUrl)
      .then(response => {

        cards.appendChild(CreateCard(response))

      })
      .catch(err => {
        console.log(`your error is: ${err}`);
      });
    })
  })
 
.catch(err => {
  console.log(`your error is: ${err}`);
});



// followersArray.forEach( item => {
//   axios.get(`https://api.github.com/users/${item}`)
//   .then(response => {

//     cards.appendChild(CreateCard(response))
//   })
//   .catch(error => {
//     console.log(`Your problem is: ${error}`)
//   })
// });



/* [✅] Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function CreateCard(gitUserInfo){
  const card = document.createElement('div'),
    img = document.createElement('img'),
    cardInfo = document.createElement('div'),
    name = document.createElement('h3'),
    username = document.createElement('p'),
    location = document.createElement('p'),
    link = document.createElement('p'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p'),
    showMore = document.createElement('button'),
    blog = document.createElement('p'),
    company = document.createElement('p'),
    email =  document.createElement('p'),
    hiddenFields = document.createElement('div');
  
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');
  showMore.classList.add('show-more');

  hiddenFields.classList.add('hidden');
 



  img.src = gitUserInfo.data.avatar_url;
  name.textContent = gitUserInfo.data.name;
  username.textContent = gitUserInfo.data.login;
  location.textContent = gitUserInfo.data.location;
  link.innerHTML = "Profile: " + `<a target="_blank" href=${gitUserInfo.data.html_url}> ${gitUserInfo.data.html_url} </a>`;
  followers.textContent = `Followers: ${gitUserInfo.data.followers}`;
  following.textContent = `Following: ${gitUserInfo.data.following}`;
  bio.textContent = `Bio: ${gitUserInfo.data.bio}`;
  showMore.textContent = 'show more';
  blog.textContent = `Blog: ${gitUserInfo.data.blog}`;
  company.textContent = `Company: ${gitUserInfo.data.company}`;
  email.textContent = `Email: ${gitUserInfo.data.email}`;

  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(link);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(hiddenFields);
  hiddenFields.appendChild(blog);
  hiddenFields.appendChild(company);
  hiddenFields.appendChild(email);
  cardInfo.appendChild(showMore);

  showMore.addEventListener('click', function (){
    hiddenFields.classList.toggle('hidden');
  });


  return card;

}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
