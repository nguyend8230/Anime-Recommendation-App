async function sleep(millis) {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(), millis);
    });
}

async function fetch_data(url) {
    return new Promise((resolve,reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
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

async function fetch_anime_by_page(page,anime_list) {
    const data = await fetch_data(`https://api.jikan.moe/v4/anime?order_by=popularity&sort=asc&page=${page}`);
    for(const anime of data.data) {
        anime_list.push(anime);
    }
}

async function fetch_anime_by_page_range(start,end,anime_list,cooldown) {
    for(let i = start; i < end; i++) {
        const data = await fetch_anime_by_page(i,anime_list);
        console.log(i);
        await sleep(cooldown);
    }
}

function write_to_json(list, file_name) {
    const fs = require("fs");
    const json_data = JSON.stringify(list);
    fs.appendFile(file_name, json_data,(error) => console.log(error));
}

var anime_list = []

fetch_anime_by_page_range(1,121,anime_list,1000)
    .then(() => {
        console.log(anime_list.length);
        write_to_json(anime_list,"./json/anime_dataset.json");
    });

// fetch_anime_by_range(1,121,anime_list,1000)
//     .then(console.log(anime_list.length));
