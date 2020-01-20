class NumeroIntero { 
	int numeroIntero;
	public void stampaNumero() { 
		System.out.println(numeroIntero); 
	} 
}

class numeroInteroDemo {
	public static void main(String[] args) {
		NumeroIntero numeroUno = new NumeroIntero();
		NumeroIntero numeroDue = new NumeroIntero();
		numeroUno.stampaNumero(10);
		numeroDue.stampaNumero(20);
	}
}