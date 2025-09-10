import {type FunctionComponent} from 'react'


type FilterProps ={
  selectedCategory: string;
  onCategoryChange: (category: string) => void
  selectedRating: number | null
  onRatingChange: (rating: number | null) =>void
}

const categories: string[] =['all', 'beauty', 'fragrances', 'groceries', 'furniture'];
const stars: number[] =[1, 2, 3, 4 ,5];

export const ProductsFilter: FunctionComponent<FilterProps> = ({ 
  selectedCategory,
  onCategoryChange,
  selectedRating,
  onRatingChange,
}) => {
  return (
    <div>
      <select value={selectedCategory} onChange={e=> onCategoryChange(e.target.value)}>
       {categories.map(cat =>(
        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
       ))}
      </select>
      
      <select value={selectedRating ?? ''} onChange={e=> onRatingChange(Number(e.target.value) || null)}>
      <option value="">All Ratings</option>
      {stars.map(star=>(
        <option key={star} value={star}>{star} Stars</option>
      ))}
      </select>
    </div>
  )
}
