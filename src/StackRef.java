import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class StackRef {

    public static class NodeGeneric<T> {
        private T data;
        private NodeGeneric<T> next;
        public NodeGeneric() {
        this(null);
        }
        public NodeGeneric(T data) {
        this.data = data;
        next = null;
        }
        public T getData() {
        return data;
        }
        public void setData(T data) {
        this.data = data;
        }
        public NodeGeneric getNext() {
        return next;
        }
        public void setNext(NodeGeneric<T> next) {
        this.next = next;
        }
        }

    public interface StackGeneric<T> {
        public boolean empty();
        public boolean full();
        public T pop();
        public void push(T item);
    }
    


    public static class StackRefGeneric<T> implements StackGeneric<T> {
        private NodeGeneric<T> top;
        public StackRefGeneric(){
        top = null;
        }
        public boolean empty() {
        // insert code
        return top == null;
        }
        public boolean full() {
        return false;
        }
        public T pop() {
            if (empty()) {
                throw new RuntimeException("Stack is empty");
            }
            T item = top.getData();
            top = top.getNext();
            return item;

        }
        public void push(T item) {
        NodeGeneric<T> newp = new NodeGeneric<T>(item);
        newp.setNext(top);
        top = newp;
        }
        } 
        
    public static void main(String[] args) {
        JSONParser parser = new JSONParser();
        
        
        try {
            long startTime = System.nanoTime();
    
            Object obj = parser.parse(new FileReader("100000.json"));
            JSONObject jsonObject = (JSONObject) obj;
            JSONArray array = (JSONArray) jsonObject.get("Usuarios");
    
            int size = array.size();
            StackRefGeneric<Object> stack = new StackRefGeneric<Object>();
                
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
