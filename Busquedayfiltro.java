package busquedayfiltro;

import java.io.File;
import java.lang.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.Random;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


public class Busquedayfiltro {
   static class listadinamica{
       animales[] arreglo;
       int size;
       int capacity;
       
       public listadinamica(){
           this.size=0;
           this.capacity=1;
           this.arreglo= new animales[capacity];
           
           
       }
       
       
      public animales[] Adicionar(animales dato){
        // se obtiene el size del arreglo
        size=0;
        capacity=arreglo.length;
        for(int i=0 ;i<arreglo.length;i++){
            if (arreglo[i]!=null){
                size=size+1;
               
            }
            else{
                size=size;
               
            }
        }
        if (size <capacity){
         
            arreglo[size]=dato;
            return arreglo;
            
        }
        else{
            capacity=capacity*2;
            animales [] arreglo2=new animales[capacity];
            for (int i=0;i<arreglo.length;i++){
                arreglo2[i]=arreglo[i];
            }
            arreglo2[size]=dato;
            return arreglo2;
            
        }
          
      }
      public void actualizar(animales d,int i){
          arreglo[i]=d;
      }
      public animales[] eliminar(String ID){
          animales[] nuevo =new animales[capacity];
         for (int i=0;i<size;i++){
             if(arreglo[i].getID().equals(ID)==true&& arreglo[i]!=null){
                for (int j=i;j<size ;j++){
                   nuevo[j]=arreglo[j+1];
                }
             break;
               
             }
             else{
              nuevo[i]=arreglo[i];
                
             }
         
         }
         return nuevo;
      }
       public animales Busqueda1(String ID){
           int x=0;
         for (int i=0;i<arreglo.length;i++){
             if(arreglo[i].getID()==ID){
                x=i;
                break;
             }
         }
         return arreglo[x];
      }
      public void imprimir(){
          
          for (int i=0;i<arreglo.length;i++){
              if (arreglo[i]!=null){
              System.out.println(arreglo[i]);  
              }
          }
      }
      public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
        public int getCapacity() {
		return capacity;
	}
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
        public animales[] getarreglo() {
		return arreglo;
	}
	public void setarreglo(animales[] arreglo) {
		this.arreglo= arreglo;
	}
       public animales acceder(int i) {
              return arreglo[i];
	}
   }
  

    
 static class animales{
    String nombre;
    String raza;
    String genero;
    int edad;
    String ID;
    
    public  animales(String ID,int edad){
        
    this.nombre=null;
    this.raza=raza;
    this.genero=null;
    this.edad=edad;
    this.ID=ID;
  }
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
        public String getGenero() {
		return genero;
	}
	public void setGenero(String genero) {
		this.genero = genero;
	}
	public String getRaza() {
		return raza;
	}
	public void setRaza(String raza) {
		this.raza = raza;
	}
	public int getEdad() {
		return edad;
	}
	public void setEdad(int edad) {
		this.edad = edad;
	}
        public String getID() {
		return ID;
	}
	public void setID(String ID) {
		this.ID=ID;
	}
  }
      private static void Extraer(JSONObject jsonObject,listadinamica arreglo) {
        JSONObject Mascota=(JSONObject) jsonObject.get("Mascota");
        String ID= (String) Mascota.get("ID");
        long edad=(long)Mascota.get("edad");
        int edad1=(int)(edad);
        animales persona = new animales(ID,edad1);
        arreglo.setarreglo(arreglo.Adicionar(persona));
        
        
        
        
        }

 
 
  public static void main(String[] args) throws IOException, ParseException {
   long inicio=System.nanoTime();
   listadinamica arreglo=new listadinamica();
    listadinamica resultados=new listadinamica();
  
    JSONParser jsonParser= new JSONParser();
    try(FileReader reader =new FileReader("/Users/nataliagongora/NetBeansProjects/poofinal/Busquedayfiltro/src/busquedayfiltro/pruebas.json")){
        
        Object obj=jsonParser.parse(reader);
        JSONArray personasList=(JSONArray) obj;
        for (Object persona:personasList){
            Extraer((JSONObject)persona,arreglo);
            
        }
          
    }catch(FileNotFoundException e){
        e.printStackTrace();
        
    }catch(IOException e){
       e.printStackTrace();
        
    }catch(ParseException e){
        e.printStackTrace();
    }
   
            

    
    // buscar animales que cumplan con la edad 
     int años=12;
     //Scanner sc = new Scanner(System.in);
     //System.out.print("Introduzca la edad 1-20");
     //años  = sc.nextInt(); 
     //for (int i=0;i<arreglo.size();i++){
       //System.out.println("edad="+arreglo.get(i).getEdad()+" ID="+arreglo.get(i).getID());
       
     // }
        
     for (int i=0;i<arreglo.getSize();i++){
      if(años==arreglo.acceder(i).getEdad()){ 
       resultados.setarreglo(resultados.Adicionar(arreglo.acceder(i)));
       //System.out.println("ID="+arreglo.acceder(i).getID()+" edad="+arreglo.acceder(i).getEdad());
      }
    }
    //arreglo.imprimir();
    //arreglo.setarreglo(arreglo.eliminar("6457fdc5b017e67f1d3d5045"));
    //arreglo.imprimir();
   
   long fin=System.nanoTime();
   long t=(fin-inicio);
   System.out.println(t);
  }
  }