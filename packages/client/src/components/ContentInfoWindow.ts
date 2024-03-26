export const contentInfo = (
  name?: string,
  description?: string,
  locale?: string
) => {
  return (
    '<div id="content" style="max-width: 300px; display: flex; flex-direction: column; gap: 15px">' +
    `<img src="https://source.unsplash.com/300x200/?${name}" alt="Imagem do local"/>` +
    `<h4 id="firstHeading" class="firstHeading">${name}</h4>` +
    '<div id="bodyContent" style="display: flex; flex-direction: column; gap: 5px" >' +
    `<p>${description} </p>` +
    `<p>Localizado em: ${locale}` +
    '</div>' +
    '</div>'
  )
}
