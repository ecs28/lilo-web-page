// API base URL
const apiBaseURL = "https://cat-fact.herokuapp.com/"

/**
 * getFacts get facts from a public api
 *
 * @param animal
 * @param quantity
 *
 * @see https://alexwohlbruck.github.io/cat-facts/docs/endpoints/facts.html
 */
async function getFacts(animal, quantity) {
    // data validation, we don't need to call API if some data is missing
    if ( animal === undefined || quantity === undefined || animal === '' || quantity === 0) {
        alert("Animal type or quantity invalid");
        return;
    }

    // API URL, this example is a get, but post with json is pretty simple to change
    const factsURL = apiBaseURL+"facts?"+"animal_type="+animal+"&amount="+quantity;

    // fetch will can an api
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // @see https://www.digitalocean.com/community/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
    try{
        await fetch(factsURL).
        then(response => {return response.json()}). //receive response and convert to json
        then((data) => { // here is where you add what you want to do with the response
            console.log('Success', data);
            if (data != undefined && data.length > 0 ) {
                // you can change to some html stuff
                // getting just first one
                alert(data[0].text);
            }
        }).
        catch(error => error); // capture error
    } catch (e) {
        logAndAlert(e);
    }
    return;
}

function logAndAlert(error){
    console.error(error);
    alert("Error getting facts :" + error);
}