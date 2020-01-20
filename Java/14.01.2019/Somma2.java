class Somma2{
	public static void main(String args[]) throws java.io.IOException{
		Somma2 cerchio1 = new Somma2();
		Somma2 cerchio2 = new Somma2();
		Somma2 cerchio3 = cerchio1;
		if (cerchio3 == cerchio1) {
			System.out.println("a");
		}
		if (cerchio2 == cerchio1) {
			System.out.println("b");
		}
		cerchio2 = cerchio1;
		if (cerchio2 == cerchio1) {
			System.out.println("c");
		}
	}
}
