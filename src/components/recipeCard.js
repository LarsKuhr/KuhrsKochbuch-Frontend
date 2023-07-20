import { Link } from 'react-router-dom'

import cat_nudeln from '../images/recipeIcons/cat_nudeln.png'
import cat_reis from '../images/recipeIcons/cat_reis.png'
import cat_teig from '../images/recipeIcons/cat_teig.png'
import cat_salat from '../images/recipeIcons/cat_salat.png'
import cat_suppe from '../images/recipeIcons/cat_suppe.png'
import cat_anderes from '../images/recipeIcons/cat_anderes.png'
import cat_kuchen from '../images/recipeIcons/cat_nudeln.png'
import cat_desserts from '../images/recipeIcons/cat_desserts.png'

const RecipeCard = ({recipe}) => {

    const getIcon = (categorie) => {
        switch (categorie) {
            case 'Nudeln': return cat_nudeln 
            case 'Reis': return cat_reis 
            case 'Teig': return cat_teig 
            case 'Salat': return cat_salat 
            case 'Suppe': return cat_suppe 
            case 'Anderes': return cat_anderes 
            case 'Kuchen': return cat_kuchen
            case 'Desserts': return cat_desserts
            default: return cat_anderes
        }
    }

    return (
        <div className="recipe">
            <div className='image'>
                <img src={getIcon(recipe.categorie)} alt="Test"/>
            </div>
            <div className='info'>
                <Link to={'/recipe/'+recipe._id}>
                    {recipe.name}
                </Link>
                <h3>Dauer: {recipe.duration} min</h3>
            </div>
        </div>
    )
}

export default RecipeCard