export function getPaginatedItems(
  items: any[], // Substitua 'any[]' pelo tipo correto dos seus itens
  currentPage: number,
  itemsPerPage: number,
) {
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return items.slice(indexOfFirstItem, indexOfLastItem);
}
