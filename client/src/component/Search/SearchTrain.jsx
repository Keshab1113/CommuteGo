import React from 'react'

const SearchTrain = () => {
    return (
        <div>
            const url = 'https://trains.p.rapidapi.com/';
            const options = {
                method = { POST },
                headers= {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'd01f0af71emsh43895e008fde272p173567jsn5ff7486fecf0',
                    'X-RapidAPI-Host': 'trains.p.rapidapi.com'
	            },
                body= {search: 'Rajdhani'}
            };

            try {
	            const response = await fetch(url, options);
                const result = await response.text();
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        </div>
    )
}

export default SearchTrain
