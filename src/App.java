import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class App {
    
    public static void main(String[] args) {
        
        JSONParser parser = new JSONParser();
        Cola cola = new Cola(1000000);

        try {
            long startTime = System.nanoTime();
            
            Object obj = parser.parse(new FileReader("usuarios1000,000.json"));
            JSONObject jsonObject = (JSONObject) obj;
                        
            JSONArray array = (JSONArray) jsonObject.get("Usuarios");
            System.out.println("");
            
            for(int i = 0 ; i < array.size() ; i++) {
                cola.insertar(array.get(i));
            }
            
            int i = 1; 
            while(!cola.colaVacia()) {
                
                JSONObject jsonObject1 = (JSONObject) cola.quitar();
                
                System.out.println("Orden: " + i++);
                System.out.println("ID: " + jsonObject1.get("id"));
                System.out.println("Nombre: " + jsonObject1.get("nombre"));
                System.out.println("Apellido: " + jsonObject1.get("apellido"));
                System.out.println("Telefono: " + jsonObject1.get("telefono"));
                System.out.println("Email: " + jsonObject1.get("email"));
                System.out.println(" ");
            }
            System.out.println("");
            
            long endTime = System.nanoTime();

            long duration = (endTime - startTime); // en nanosegundos
            double seconds = (double)duration / 1_000_000_000.0; // en segundos
            System.out.println("El tiempo de ejecución es de " + seconds + " segundos.");
            
        } catch(FileNotFoundException e) {
            e.printStackTrace();
        } catch(IOException e) {
            e.printStackTrace();
        } catch(ParseException e) {
            e.printStackTrace();
        }   
    }
}
