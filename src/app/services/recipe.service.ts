import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http : HttpClient) { }
 
  private apiURL = "https://www.themealdb.com/api/json/v1/1/";

  getbyFirstLetter():Observable <any>{
    return this.http.get<any>(this.apiURL + "search.php?f=c ");
  }

  get20Ramdom(): Observable <any> {
    return this.http.get<any>(this.apiURL+"");
  }


  getRandomRecipes(): Observable<Recipe[]> {
    const uniqueRecipes = new Set<Recipe>(); // Para almacenar recetas únicas

    return new Observable<Recipe[]>(observer => {
      const fetchRecipe = async () => {
        try {
          const response = await this.http.get<{ meals: Recipe[] }>(this.apiURL + 'random.php').toPromise();

          // Validar que la respuesta no sea undefined y contenga datos
          if (response && response.meals && response.meals.length > 0) {
            const recipe = response.meals[0]; // Obtener la receta del objeto de respuesta

            if (!uniqueRecipes.has(recipe)) {
              uniqueRecipes.add(recipe); // Agregar receta única

              // Verificar si ya hemos alcanzado el número de recetas deseado
              if (uniqueRecipes.size < 20) {
                await fetchRecipe(); // Hacer otra llamada para obtener más recetas
              }
            }
          }
        } catch (error) {
          observer.error(error); // Manejar errores
        }
      };

      const fetchUntilLimit = async () => {
        while (uniqueRecipes.size < 20) {
          await fetchRecipe();
        }

        // Una vez que tengamos suficientes recetas, emitimos el resultado
        observer.next(Array.from(uniqueRecipes)); // Emitir el array de recetas únicas
        observer.complete(); // Completar el observable
      };

      fetchUntilLimit().catch(error => observer.error(error)); // Manejar errores
    });
  
  }
}
