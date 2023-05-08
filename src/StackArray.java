import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class StackArray{

public interface StackGeneric<T> {
    public boolean empty();
    public boolean full();
    public T pop();
    public void push(T item);
}

public static class StackArrayGeneric<T> implements StackGeneric<T> {
    private static final int N = 3;
    private int top;
    private T[] sarray;
    // constructors
    public StackArrayGeneric() {
    this(N);
    }
    public StackArrayGeneric(int n) {
    top = 0;
    sarray = (T[]) new Object[n];
    }
    // value returning methods
    public boolean empty() {
    return top <= 0;
    }
    public boolean full() {
    return top >= sarray.length;
    }
    public T pop() {
    if(empty())
    throw new RuntimeException("Stack is empty");
    top--;
    return sarray[top];
    }
    // void method
    public void push(T item) {
    if(full())
    throw new RuntimeException("Stack is full");
    sarray[top]=item;
    top++;
    } 

}

public static void main(String[] args) {
    JSONParser parser = new JSONParser();
    
    
    try {
        long startTime = System.nanoTime();

        Object obj = parser.parse(new FileReader("1000.json"));
        JSONObject jsonObject = (JSONObject) obj;
        JSONArray array = (JSONArray) jsonObject.get("Usuarios");

        int size = array.size();
        StackGeneric <Object> stack;
        stack = new StackArrayGeneric<Object> (size);
            
        for(int i = 0 ; i < size ; i++) {
            stack.push(array.get(i));
        }
        
        int i = 1; 
        while(!stack.empty()) {
                
            JSONObject jsonObject1 = (JSONObject) stack.pop();
            
            System.out.println("Busqueda: " + i++);
            System.out.println("ID: " + jsonObject1.get("_id"));
            System.out.println("Nombre: " + jsonObject1.get("nombre"));
            System.out.println("Sexo: " + jsonObject1.get("apellido"));
            System.out.println("Raza: " + jsonObject1.get("telefono"));
            System.out.println("Edad: " + jsonObject1.get("email"));
            System.out.println(" ");
        }

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