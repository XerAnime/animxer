const baseUrl = "https://anime-sensei-api.vercel.app/anime/gogoanime";

export const makeRequest = async (endpoint, config) => {
    const url = `${baseUrl}${endpoint}`;
    try {
        const request = await fetch(url, config);
        return await request.json();
    } catch (e) {
        return [];
    }
};

export const getTopAnimes = async () => {
    const [top, popular] = await Promise.all([
        makeRequest("/top-airing", { revalidate: 3600 }),
        makeRequest("/popular", { revalidate: 3600 })
    ]);

    return { top: top.results, popular: popular.results };
}


export const getCarousel = async () => {
    let maxPage = 6;
    const carousel = [], indexes = [];
    while (indexes.length != maxPage) {
        const randomIndex = Math.floor(Math.random() * 20);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex)
        }
    };

    let randomPage = Math.floor(Math.random() * 20);
    const req = await makeRequest(`/popular?page=${randomPage}`, { cache: 'no-store' });

    for (let i = 0; i < indexes.length; i++) {
        const randomAnime = req.results[indexes[i]];
        const animeInfo = await makeRequest(`/info/${randomAnime?.id}`, { cache: 'force-cache' });
        carousel.push(animeInfo);
    }
    return carousel;
}

export const getRandomAnime = async () => {
    let randomPage = Math.floor(Math.random() * 500),
        randomIndex = Math.floor(Math.random() * 20);
    const req = await makeRequest(`/popular?page=${randomPage}`, { cache: 'force-cache' });
    const randomAnime = req.results[randomIndex];
    return randomAnime?.id;
}