export const contentInfo = (
  name?: string,
  description?: string,
  image?: string
) => {
  return (
    '<div id="content" style="max-width: 300px; display: flex; flex-direction: column; gap: 15px">' +
    `<img src="${image}" alt="Imagem de ${name}"/>` +
    `<h4 id="firstHeading" class="firstHeading">${name}</h4>` +
    '<div id="bodyContent" style="display: flex; flex-direction: column; gap: 5px" >' +
    `<p>${description} </p>` +
    '</div>' +
    '</div>'
  )
}
