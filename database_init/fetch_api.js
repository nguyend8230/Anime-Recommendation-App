// mal_id, anime name, anime english name, studios, synopsis, genres, themes
var anime_list = {
    "mal_id": [],
    "url": [],
    "image_url": [],
    "title": [],
    "title_english": [],
    "synopsis": [],
    "studios": [],
    "genres": [],
    "themes": [],
};

async function sleep(millis) {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(), millis);
    });
}

async function fetch_anime(url) {
    return new Promise((resolve,reject) => {
        fetch(url)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                // Parse the response as JSON
                return response.json();
            })
            .then(data => {
                // console.log(data.data[0].images.webp.image_url)
                for(let anime of data.data) {
                    anime_list["mal_id"].push(anime.mal_id);
                    anime_list["url"].push(anime.url);
                    anime_list["image_url"].push(anime.images.webp.image_url);
                    anime_list["title"].push(anime.title);
                    anime_list["title_english"].push(anime.title_english);
                    anime_list["synopsis"].push(anime.synopsis);
                    anime_list["studios"].push(anime.studios.map(obj=>obj.name));
                    anime_list["genres"].push(anime.genres.map(obj=>obj.name));
                    anime_list["themes"].push(anime.themes.map(obj=>obj.name));
                }
                console.log(data.data[0].title_english);
                resolve("xdd");
            })
            .catch(error => {
                // Handle errors
                console.error("Error:", error.message);   
                reject(error.message); 
            });
    }); 
}

async function fetch_all_anime(count) {
    async function callback(resolve,reject) { 
        for(let i = 1; i < count+1; i++) {
            fetch_anime(`https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&page=${i}`)
                .then((data) => {
                    console.log(`the data received is: ${data}`);
                })
                .catch((error) => console.log(error));
    
            await sleep(1000);
        }
    }
    return new Promise(callback);
}

function write_to_json(list, file_name) {
    const fs = require("fs");
    const json_data = JSON.stringify(list);
    fs.appendFile(file_name, json_data,(error) => console.log(error));
}

// fetch_anime("https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&page=1");

fetch_all_anime(120)
    .then(() => {
        write_to_json(anime_list,"./json/anime_dataset.json");
    });