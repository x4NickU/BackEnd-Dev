class Vehicle {  
  int passengers; // number of passengers  
  int fuelcap;    // fuel capacity in gallons 
  int mpg;        // fuel consumption in miles per gallon 
}  
  
// This class declares an object of type Vehicle.  
class TwoVehicles {  
  public static void main(String args[]) {  
    Vehicle minivan = new Vehicle();  
    Vehicle sportscar = new Vehicle();  
    int range;
    // assign values to fields in minivan 
    minivan.passengers = 7; 
    minivan.fuelcap = 16; 
    minivan.mpg = 21; 
  
    // assign values to fields in sportscar 
    sportscar.passengers = 2; 
    sportscar.fuelcap = 14; 
    sportscar.mpg = 12; 
  
    // compute the ranges assuming a full tank of gas 
  	 
  	 
    range = minivan.fuelcap * minivan.mpg;
    System.out.println("Minivan can carry " + minivan.passengers + 
                       " with a range of " + minivan.range);  
    range = sportscar.fuelcap * sportscar.mpg;
    System.out.println("Sportscar can carry " + sportscar.passengers + 
                       " with a range of " + sportscar.range);  
  }  
}
