
const Products = ({product}) => {
  return (
    <div className="flex flex-col justify-center items-center w-2xs h-37.5 border-2 gap-1 bg-gray-400 rounded-2xl">
      <h2 className="font-bold">{product.name}</h2>
      <h2 className="font-thin">{product.category}</h2>
      <h2 className="text-red-950 font-bold">${product.price}</h2>
      <h2 className="text-4xl">{product.emoji}</h2>
    </div>
  )
}

export default Products;
