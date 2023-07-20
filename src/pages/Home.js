import { useEffect, useState } from 'react'
import RecipeCard from '../components/recipeCard'
import categories from '../categories'

const Home = () => {
    const [recipes, setRecipes] = useState(null)
    const queryParameters = new URLSearchParams(window.location.search)
    var cat = "non";
    if (queryParameters.has("categorie")) {
        cat = queryParameters.get("categorie")
    }

    useEffect(() => {
        
        const fetchRecipes = async () => {
            var addition = "non"
            if (cat) addition = cat

            const response = await fetch('https://kuhrkochbuch-api.onrender.com/api/recipes/all/'+addition)
            const json = await response.json()

            if (response.ok) {
                setRecipes(json)
            }
        }

        fetchRecipes()
    }, [cat])

    var categorieName = cat
    if (categorieName === "non") categorieName = "Alles"

    return (
        <div className="home">
            <div className='bar'>
                <h1>Rezepte - {categorieName}</h1>
                <form action="">
                
                <select name="categorie" id="" className='barItems'>
                    <option value="non">Alles</option>
                    {categories.map((categorie) => (
                        <option value={categorie}>{categorie}</option>
                    ))}
                </select>
                <input type="submit" value="Suchen" name="Suchen" id="" className='barItems'/>
            </form>
            </div>

            <div className='recipes'>
                { recipes && recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}

export default Home