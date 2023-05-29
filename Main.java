
import java.text.SimpleDateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.ArrayList;
import java.lang.Math;
import java.util.Date;
import java.io.File;
import java.lang.*;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
class Main {
  static class fundacion{
    String nombre;
    int telefono;
    String email;
    
  }
  static class convocatorias{
    String fecha;
    String nombre;
    fundacion fundacion;
    public convocatorias(String fecha){
      this.fecha=fecha;
    }
    
    public String getDate() {
		return fecha;
	}
	public void setDate(String date) {
		this.fecha = date;
	}
    
  }
  
  
  public static void main(String[] args) {
    long startTime = System.nanoTime();

   ArrayList<convocatorias> monticulo=new ArrayList<>();
     try(FileReader reader =new FileReader("600Kn.json")){
        JSONParser jsonParser = new JSONParser();
        Object obj=jsonParser.parse(reader);
        JSONArray convoList=(JSONArray) obj;
        for (Object convo:convoList){
            Extraer((JSONObject)convo,monticulo);
            
        }
          
    }catch(FileNotFoundException e){
        e.printStackTrace();
        
    }catch(IOException e){
       e.printStackTrace();
        
    }catch(ParseException e){
        e.printStackTrace();
    }
    long endTime = System.nanoTime();

   long startTime2 = System.nanoTime();
   heapsort(monticulo); 
   System.out.println(getmax(monticulo).getDate());
   long endTime2 = System.nanoTime();
    //long startTime3 = System.nanoTime();
   //for (int i=0;i<monticulo.size();i++){
    // System.out.println(monticulo.get(i).getDate());
   //}
    //long endTime3 = System.nanoTime();
    System.out.println((endTime-startTime)/1000000);
    System.out.println((endTime2-startTime2)/1000000);
    //System.out.println((endTime3-startTime3)/1000000);
  }

  public static int padre(int i){
    return (i-1)/2;
  }
  public static int lc(int i){
    int lc=2*i +1;
    return lc;
  }
  public static  int rc(int i){
    int rc=(2*i)+2;
    return rc;
  }
  
  public static void SiftUp(int i,ArrayList<convocatorias> monticulo){
    while (i>=0 && monticulo.get(padre(i)).getDate().compareTo(monticulo.get(i).getDate())<0){
       convocatorias h =new convocatorias(monticulo.get(i).getDate());
      monticulo.set(i, monticulo.get(padre(i)));
      monticulo.set(padre(i), h);
      i=padre(i);
    }
  }
  public static void SiftDown(int i,ArrayList<convocatorias> monticulo,int size){
    int max=i;
    int l=lc(i);
    int r=rc(i);
    if (l< size && monticulo.get(l).getDate().compareTo(monticulo.get(max).getDate())>0){
      max=l;
    }
    if(r< size && monticulo.get(r).getDate().compareTo(monticulo.get(max).getDate())>0){
      max=r;
    }
    if (i!=max){
      convocatorias  h= new convocatorias (monticulo.get(i).getDate());
      monticulo.set(i, monticulo.get(max));
      monticulo.set(max, h);
      SiftDown(max, monticulo,size);
    }
  }
  public static void Insert(convocatorias p,ArrayList<convocatorias> monticulo){
    monticulo.add(p);
    int size=monticulo.size();
    SiftUp(size-1, monticulo);
  }
  public static convocatorias getmax(ArrayList<convocatorias> monticulo){
    return monticulo.get(0);
  }
  public static convocatorias extraermax(ArrayList<convocatorias> monticulo){
    convocatorias result=monticulo.get(0);
    int size=monticulo.size();
    
    monticulo.set(0, monticulo.get(size-1));
    monticulo.remove(size-1);
    SiftDown(0,monticulo,size-1);
    return result;
  }
  public static void remove(int i,ArrayList<convocatorias> monticulo){
    String n=getmax(monticulo).getDate();
    convocatorias s=monticulo.get(i);
      s.setDate(n);
    monticulo.set(i,s);
    extraermax(monticulo);
    
  }
  public static void cmabiarprioridad(int i,convocatorias  p,ArrayList<convocatorias > monticulo){
    int size=monticulo.size();
    convocatorias oldp=new convocatorias(monticulo.get(i).getDate());
    oldp =monticulo.get(i);
    monticulo.set(i,p);
    if(p.getDate().compareTo(oldp.getDate())>0){
      SiftUp(i,monticulo);
    }
    else{
      SiftDown(i,monticulo,size);
    }
    
  }
  public static void buildheap(ArrayList<convocatorias> monticulo){
    int size=monticulo.size();
    for (int i=(size/2)-1;i >=0;i--){
      SiftDown(i,monticulo,size);
      
    }
  }
  public static void heapsort(ArrayList<convocatorias> monticulo){
    buildheap(monticulo);
    int size=monticulo.size();
    for (int i=size-1;i>=1;i--){
      convocatorias n=monticulo.get(0);
      monticulo.set(0,monticulo.get(i));
      monticulo.set(i,n);
      SiftDown(0,monticulo,i);
    }
    
  }
 private static void Extraer(JSONObject jsonObject, ArrayList<convocatorias> monticulo) {
    
   String date = (String) jsonObject.get("date");
    
        convocatorias C = new convocatorias(date);
        Insert(C, monticulo);
   
}
}

   

  
