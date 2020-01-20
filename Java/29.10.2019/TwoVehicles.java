class Vehicle {  
  int passengers = 7; // number of passengers  
  int fuelcap;    // fuel capacity in gallons 
  int mpg;        // fuel consumption in miles per gallon 
  int range;
}  
  
// This class declares an object of type Vehicle.  
class TwoVehicles {  
  public static void main(String args[]) {  
    Vehicle minivan = new Vehicle();  
    Vehicle sportscar = new Vehicle();  

    // assign values to fields in minivan  
    minivan.fuelcap = 16; 
    minivan.mpg = 21; 
  
    // assign values to fields in sportscar 
    sportscar.passengers = sportscar.passengers + 2; 
    sportscar.fuelcap = 14; 
    sportscar.mpg = 12; 
  
    // compute the ranges assuming a full tank of gas 
  	sportscar.range = sportscar.fuelcap * sportscar.mpg; 
  	minivan.range = minivan.fuelcap * minivan.mpg; 

    System.out.println("Minivan can carry " + minivan.passengers + 
                       " with a range of " + minivan.range);  
    
    System.out.println("Sportscar can carry " + sportscar.passengers + 
                       " with a range of " + sportscar.range);  
  }  
}
