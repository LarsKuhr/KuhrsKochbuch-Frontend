import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Recipe = () => {
    const multi = 1;

    const [recipe, setRecipe] = useState(null)
    const { id } = useParams()
    
    useEffect(() => {

        const getRecipe = async () => {
            const respone = await fetch('/api/recipes/'+id)
            const json = await respone.json()

            if (respone.ok) {
                console.log(json)
                setRecipe(json)
            }
        }

        getRecipe()
    }, [id])

    return (
        <div className="recipePage">
            <h1>{recipe && recipe.name}</h1>
            <div className="ingredients">
                <h2>Zutaten</h2>
                {recipe && recipe.ingredients.map((ingredient) => (
                    <div className="ingredient">
                        <p>{ingredient.amount*multi+' '+ingredient.unite+' '+ingredient.name}</p>
                    </div>
                ))}
            </div>
            <div className="steps">
                <h2>Zubereitung</h2>
                <div className="stepList">
                    {recipe && recipe.steps.map((step) => (
                        <div className="step">
                            <h4 className="numbers">{step.number}</h4>
                            <p align="justify">{step.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Recipe