class DWDemo {   
  public static void main(String args[]) throws java.io.IOException {  
    char ch;  
    do {
      System.out.print("Press a key following by ENTER: "); 
      do {
      	ch = (char) System.in.read(); // get a char 
  		}while(ch == '\n' | ch == '\r');
  		if (ch > 'q') {
  			System.out.print("Nah nah vicino ma troppo alto \n"); 
  		}else{
  			System.out.print("Nah nah vicino ma troppo basso \n"); 
  		}
    }while(ch != 'q'); 
  }
}