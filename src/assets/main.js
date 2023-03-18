const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCleo0cLOSiib0W62-GK1KdQ&part=snippet%2Cid&order=date&maxResults=9";

const content = null || document.getElementById("content");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b8bf19ed40msh36efd21e0f56d70p169e58jsn28d33b38f74d",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};
async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

//va permitir automaticamente cuando este cargando el archivo, ejecutar la funcion
//funcion que se invoca a si mismo, con JavaScript podemos tener funciones anónimas que permitan llamarse automáticamente, la estructura cuenta con la palabra reservada **async / await** y y la sintaxis de una función de flecha asíncrona autoinvocada.
//TODO: El formato de la función de flecha asíncrona autoinvocada es el siguiente: (async () => { Código aquí })();
//* la función se cierra con otro conjunto de paréntesis: ) (). Este segundo conjunto de paréntesis llama automáticamente a la función.
(async () => {
  try {
    //videos: Object {kind: "youtube#searchListResponse", nextPageToken: "CAUQAA", items: Array(9) }
    const videos = await fetchData(API);

    //map recorre el array y retornará nuevo array, PERO con el templateString APLICADO a cada elemento
    //el 1ª inicio TEMPLATE-SLICE-JOIN= `${videos..., final TEMPLATE= .join("")}`
    //el 2ª inicio TEMPLATE RETURN CADA ELEMENTO=`<div class="group..., final TEMPLATE RETURN= </h3></div>`
    let view = `${videos.items
      .map(
        (video) =>
          `<div class="group relative">
        <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
        </div>
        <div class="mt-4 flex justify-between">
            <h3 class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>${video.snippet.title}
            </h3>
        </div>
    </div>`
      )
      .slice(0, 4)
      .join("")}`;
    content.innerHTML = view;
  } catch (error) {
    console.log(error);
  }
})();
